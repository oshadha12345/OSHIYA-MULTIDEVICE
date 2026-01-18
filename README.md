Copy Code 📋</button>
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

👇👇 WebPair Link Repo 👇👇

Copy Code 📋</button>
  <pre><code id="workflowCode"> https://github.com/oshadha12345/Oshiya-md-bot-session</code></pre>
</div>