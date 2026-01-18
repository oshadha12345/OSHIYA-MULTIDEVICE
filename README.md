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
