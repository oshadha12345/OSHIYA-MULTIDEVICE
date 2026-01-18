<!DOCTYPE html>
<html>
<head>
<title>GitHub Workflow Copier</title>
<style>
  body { font-family: sans-serif; background-color: #121212; color: white; padding: 20px; }
  .container { max-width: 700px; margin: auto; background: #1e1e1e; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.5); }
  pre { background: #000; padding: 15px; border-radius: 5px; overflow-x: auto; border: 1px solid #333; }
  code { color: #00ff00; }
  .btn { background: #25d366; color: black; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold; margin-bottom: 10px; }
  .btn:hover { background: #1da851; }
</style>
</head>
<body>

<div class="container">
  <h2>┃╯╰ GitHub Workflow Copier</h2>
  <button class="btn" onclick="copyCode()">Copy Code 📋</button>
  <pre><code id="workflowCode">name: Node.js CI/CD Workflow

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20.x]
        
    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Start application
      run: npm start</code></pre>
</div>

<script>
  function copyCode() {
    var code = document.getElementById("workflowCode").innerText;
    navigator.clipboard.writeText(code);
    alert("Code Copied to Clipboard! 🚀");
  }
</script>

</body>
</html>
