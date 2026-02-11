# pyragify: Transform Code Repositories for LLM Analysis

pyragify is a Python tool that converts code repositories into semantic chunks optimized for Large Language Model analysis, particularly NotebookLM.

## Core Purpose
Breaks down complex codebases into manageable, context-preserving units that enhance code comprehension and enable powerful LLM-driven analysis.

## Key Features
- **Semantic Chunking**: Intelligently extracts functions, classes, and comments from Python files using AST parsing
- **Multi-format Support**: Handles Python (.py), Markdown (.md), HTML (.html), CSS (.css), and other common file types
- **Smart Processing**: Uses AST for Python, regex for HTML/CSS, and header-based chunking for Markdown
- **NotebookLM Integration**: Output format specifically designed for LLM compatibility
- **Flexible Configuration**: YAML-based configuration with command-line overrides
- **Git Integration**: Respects .gitignore and .dockerignore patterns automatically

## Installation & Usage
```bash
# Recommended installation with uv
uv pip install pyragify

# Run with configuration
uv run pyragify --config-file config.yaml

# Direct CLI execution
python -m pyragify --config-file config.yaml
```

## Configuration Example
```yaml
repo_path: /path/to/repository
output_dir: /path/to/output
max_words: 200000
max_file_size: 10485760  # 10 MB
skip_patterns: ["*.log", "*.tmp"]
skip_dirs: ["__pycache__", "node_modules"]
```

## Output Structure
- `python/`: Python functions and classes
- `markdown/`: Markdown sections by headers
- `html/`: HTML script and style chunks
- `css/`: CSS rule chunks
- `other/`: Plain-text versions of unsupported files

## Workflow
1. Prepare repository with proper .gitignore
2. Configure pyragify settings
3. Process repository with pyragify
4. Upload chunks to NotebookLM for analysis
5. Generate insights, documentation, or podcasts

Perfect for code summarization, documentation generation, and intelligent Q&A about your codebase.
