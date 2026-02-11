import { BaseMessage, AIMessage } from '@langchain/core/messages';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Annotation, StateGraph, START, END } from '@langchain/langgraph';

/**
 * AgentState definition using Annotation
 */
export const AgentState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (x: BaseMessage[], y: BaseMessage[]) => x.concat(y),
    default: () => [],
  }),
  intent: Annotation<'qualify' | 'pricing' | 'general'>({
    reducer: (x: string, y: string) => (y ?? x) as 'qualify' | 'pricing' | 'general',
    default: () => 'general',
  }),
  qualification_score: Annotation<number>({
    reducer: (x: number, y: number) => y ?? x,
    default: () => 0,
  }),
});

// Initialize Gemini
const model = new ChatGoogleGenerativeAI({
  model: 'gemini-1.5-pro',
  maxOutputTokens: 2048,
});

/**
 * Nodes
 */

// 1. Classifier Node: Uses Gemini to determine intent
const classifier = async (state: typeof AgentState.State) => {
  const lastMessage = state.messages[state.messages.length - 1].content.toString();

  const classificationPrompt = `
    Classify the user's intent into one of: 'qualify' (looking for growth/audits), 'pricing' (asking about costs), or 'general' (general chat/other).
    User: "${lastMessage}"
    Intent:
  `;

  const response = await model.invoke(classificationPrompt);
  const content = response.content.toString().toLowerCase();

  let intent: 'qualify' | 'pricing' | 'general' = 'general';
  if (content.includes('pricing')) intent = 'pricing';
  else if (content.includes('qualify')) intent = 'qualify';

  return { intent };
};

// 2. Autonomous Qualification Node: Gemini analyzes and scores the lead
const qualificationResearcher = async (state: typeof AgentState.State) => {
  const lastMessage = state.messages[state.messages.length - 1].content.toString();

  const researchPrompt = `
    Analyze this message for business potential. Score from 0-100 where 100 is a high-intent enterprise lead.
    Message: "${lastMessage}"
    Score:
  `;

  const response = await model.invoke(researchPrompt);
  const score = parseInt(response.content.toString().replace(/[^0-9]/g, '')) || 50;

  const aiResponse = new AIMessage(
    `I've analyzed your request. Based on your interest in scaling, I've prioritized your session. To provide a precise strategy, what's your current monthly content volume?`
  );

  return {
    qualification_score: score,
    messages: [aiResponse],
  };
};

// 3. Pricing Node: Handles financial queries
const pricingResponder = async () => {
  const response = new AIMessage(
    'Our retainers are optimized for high-energy brands. We usually start with a Pilot Phase to prove ROI. Should I send over the pricing deck?'
  );
  return { messages: [response] };
};

// 4. General Node: Standard response
const generalResponder = async (state: typeof AgentState.State) => {
  const response = await model.invoke(state.messages);
  return { messages: [response] };
};

/**
 * Routing logic
 */
const routeByIntent = (state: typeof AgentState.State) => {
  return state.intent;
};

/**
 * Build Graph
 */
const workflow = new StateGraph(AgentState)
  .addNode('classifier', classifier)
  .addNode('pricing', pricingResponder)
  .addNode('qualify', qualificationResearcher)
  .addNode('general', generalResponder);

workflow.addEdge(START, 'classifier');

workflow.addConditionalEdges('classifier', routeByIntent, {
  pricing: 'pricing',
  qualify: 'qualify',
  general: 'general',
});

workflow.addEdge('pricing', END);
workflow.addEdge('qualify', END);
workflow.addEdge('general', END);

export const agentGraph = workflow.compile();
