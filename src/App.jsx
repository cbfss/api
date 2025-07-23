import React, { useState } from 'react';
import { Plus, Minus, Download, Eye, Code, FileText, Settings, Trash2 } from 'lucide-react';

const ApiDocGenerator = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [showPreview, setShowPreview] = useState(false);
  
  const [apiInfo, setApiInfo] = useState({
    title: 'My API Documentation',
    version: '1.0.0',
    description: 'Comprehensive API documentation for developers',
    baseUrl: 'https://api.example.com/v1',
    companyName: 'Your Company',
    contactEmail: 'api@example.com'
  });

  const [authInfo, setAuthInfo] = useState({
    type: 'Bearer Token',
    description: 'Include your API key in the Authorization header',
    example: 'Authorization: Bearer YOUR_API_KEY',
    notes: 'Keep your API key secure and never expose it in client-side code.'
  });

  const [endpoints, setEndpoints] = useState([
    {
      id: 1,
      method: 'GET',
      path: '/users',
      title: 'Get Users',
      description: 'Retrieve a list of all users',
      parameters: [
        { name: 'page', type: 'integer', required: false, description: 'Page number for pagination' },
        { name: 'limit', type: 'integer', required: false, description: 'Number of items per page' }
      ],
      responses: [
        {
          status: '200',
          description: 'Successful response',
          example: JSON.stringify({
            users: [
              {
                id: 1,
                name: "John Doe",
                email: "john@example.com",
                created_at: "2024-01-15T10:30:00Z"
              }
            ],
            pagination: {
              current_page: 1,
              total_pages: 10,
              total_items: 100
            }
          }, null, 2)
        }
      ]
    }
  ]);

  const [errorCodes, setErrorCodes] = useState([
    { code: '400', type: 'Bad Request', message: 'Invalid request parameters', description: 'The request was malformed or missing required parameters' },
    { code: '401', type: 'Unauthorized', message: 'Authentication required', description: 'Valid API key or authentication token required' },
    { code: '404', type: 'Not Found', message: 'Resource not found', description: 'The requested resource does not exist' },
    { code: '500', type: 'Internal Server Error', message: 'Server error occurred', description: 'An unexpected error occurred on the server' }
  ]);

  const addEndpoint = () => {
    const newEndpoint = {
      id: Date.now(),
      method: 'GET',
      path: '/new-endpoint',
      title: 'New Endpoint',
      description: 'Description of the new endpoint',
      parameters: [
        { name: 'id', type: 'integer', required: true, description: 'Unique identifier' }
      ],
      responses: [
        {
          status: '200',
          description: 'Successful response',
          example: JSON.stringify({ message: "Success" }, null, 2)
        }
      ]
    };
    setEndpoints([...endpoints, newEndpoint]);
  };

  const updateEndpoint = (id, field, value) => {
    setEndpoints(endpoints.map(endpoint => 
      endpoint.id === id ? { ...endpoint, [field]: value } : endpoint
    ));
  };

  const deleteEndpoint = (id) => {
    setEndpoints(endpoints.filter(endpoint => endpoint.id !== id));
  };

  const addParameter = (endpointId) => {
    setEndpoints(endpoints.map(endpoint => 
      endpoint.id === endpointId 
        ? { 
            ...endpoint, 
            parameters: [...endpoint.parameters, { name: '', type: 'string', required: false, description: '' }] 
          }
        : endpoint
    ));
  };

  const updateParameter = (endpointId, paramIndex, field, value) => {
    setEndpoints(endpoints.map(endpoint => 
      endpoint.id === endpointId 
        ? {
            ...endpoint,
            parameters: endpoint.parameters.map((param, index) => 
              index === paramIndex ? { ...param, [field]: value } : param
            )
          }
        : endpoint
    ));
  };

  const deleteParameter = (endpointId, paramIndex) => {
    setEndpoints(endpoints.map(endpoint => 
      endpoint.id === endpointId 
        ? {
            ...endpoint,
            parameters: endpoint.parameters.filter((_, index) => index !== paramIndex)
          }
        : endpoint
    ));
  };

  const addErrorCode = () => {
    setErrorCodes([...errorCodes, { code: '', type: '', message: '', description: '' }]);
  };

  const updateErrorCode = (index, field, value) => {
    setErrorCodes(errorCodes.map((error, i) => 
      i === index ? { ...error, [field]: value } : error
    ));
  };

  const deleteErrorCode = (index) => {
    setErrorCodes(errorCodes.filter((_, i) => i !== index));
  };

  const generateDocumentation = () => {
    const getMethodColor = (method) => {
      const colors = {
        GET: 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;',
        POST: 'background: #cce5ff; color: #004085; border: 1px solid #b3d7ff;',
        PUT: 'background: #fff3cd; color: #856404; border: 1px solid #ffeaa7;',
        DELETE: 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;',
        PATCH: 'background: #e2e3e5; color: #383d41; border: 1px solid #d6d8db;'
      };
      return colors[method] || colors.GET;
    };

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${apiInfo.title}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8f9fa;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            min-height: 100vh;
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 3px solid #007bff;
        }
        
        .header h1 {
            color: #007bff;
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .header .subtitle {
            color: #6c757d;
            font-size: 1.2em;
            margin-bottom: 10px;
        }
        
        .version-badge {
            display: inline-block;
            background: #28a745;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9em;
            margin-top: 10px;
        }
        
        .section {
            margin-bottom: 40px;
            page-break-inside: avoid;
        }
        
        .section h2 {
            color: #007bff;
            font-size: 1.8em;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e9ecef;
        }
        
        .section h3 {
            color: #495057;
            font-size: 1.3em;
            margin-bottom: 15px;
            margin-top: 25px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .info-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #007bff;
        }
        
        .info-card h4 {
            color: #007bff;
            margin-bottom: 10px;
        }
        
        .code-block {
            background: #2d3748;
            color: #e2e8f0;
            padding: 15px;
            border-radius: 6px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            overflow-x: auto;
            margin: 10px 0;
        }
        
        .endpoint {
            background: white;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            margin-bottom: 25px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .endpoint-header {
            background: #f8f9fa;
            padding: 20px;
            border-bottom: 1px solid #dee2e6;
        }
        
        .endpoint-title {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 10px;
            flex-wrap: wrap;
        }
        
        .method-badge {
            padding: 8px 12px;
            border-radius: 4px;
            font-weight: bold;
            font-size: 0.8em;
            text-transform: uppercase;
        }
        
        .endpoint-path {
            font-family: 'Courier New', monospace;
            font-size: 1.1em;
            color: #495057;
            background: white;
            padding: 5px 10px;
            border-radius: 4px;
            border: 1px solid #dee2e6;
        }
        
        .endpoint-content {
            padding: 20px;
        }
        
        .params-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        
        .params-table th {
            background: #f8f9fa;
            padding: 12px;
            text-align: left;
            border: 1px solid #dee2e6;
            font-weight: 600;
            color: #495057;
        }
        
        .params-table td {
            padding: 10px 12px;
            border: 1px solid #dee2e6;
            vertical-align: top;
        }
        
        .params-table tr:nth-child(even) {
            background: #f8f9fa;
        }
        
        .required {
            color: #dc3545;
            font-weight: bold;
        }
        
        .optional {
            color: #6c757d;
        }
        
        .response-example {
            background: #2d3748;
            color: #e2e8f0;
            padding: 15px;
            border-radius: 6px;
            font-family: 'Courier New', monospace;
            font-size: 0.85em;
            overflow-x: auto;
            white-space: pre-wrap;
            margin: 10px 0;
        }
        
        .status-code {
            font-weight: bold;
            padding: 5px 10px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            display: inline-block;
            margin-bottom: 10px;
        }
        
        .status-200, .status-201 { background: #d4edda; color: #155724; }
        .status-400, .status-404 { background: #fff3cd; color: #856404; }
        .status-500 { background: #f8d7da; color: #721c24; }
        
        .error-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 15px 0;
        }
        
        .error-item {
            background: white;
            border: 1px solid #dee2e6;
            border-radius: 6px;
            padding: 15px;
            margin-bottom: 15px;
        }
        
        .error-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
        }
        
        .alert {
            padding: 15px;
            margin: 20px 0;
            border-radius: 6px;
            border-left: 4px solid;
        }
        
        .alert-info {
            background: #d1ecf1;
            border-color: #17a2b8;
            color: #0c5460;
        }
        
        .alert-warning {
            background: #fff3cd;
            border-color: #ffc107;
            color: #856404;
        }
        
        .features-list {
            list-style: none;
            padding: 0;
        }
        
        .features-list li {
            padding: 8px 0;
            padding-left: 25px;
            position: relative;
        }
        
        .features-list li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #28a745;
            font-weight: bold;
        }
        
        /* Print Styles */
        @media print {
            body {
                background: white !important;
                font-size: 12pt;
                line-height: 1.4;
            }
            
            .container {
                max-width: none;
                padding: 0;
                background: white;
            }
            
            .section {
                page-break-inside: avoid;
                margin-bottom: 30px;
            }
            
            .endpoint {
                page-break-inside: avoid;
                box-shadow: none;
                border: 1px solid #000;
            }
            
            .code-block, .response-example {
                background: #f8f9fa !important;
                color: #000 !important;
                border: 1px solid #dee2e6;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>${apiInfo.title}</h1>
            <div class="subtitle">${apiInfo.description}</div>
            <span class="version-badge">Version ${apiInfo.version}</span>
        </div>

        <!-- Overview Section -->
        <div class="section">
            <h2>API Overview</h2>
            <p>Welcome to our comprehensive API documentation. This REST API provides robust functionality with full CRUD operations, authentication, and comprehensive error handling.</p>
            
            <div class="info-grid">
                <div class="info-card">
                    <h4>Base URL</h4>
                    <div class="code-block">${apiInfo.baseUrl}</div>
                </div>
                <div class="info-card">
                    <h4>Response Format</h4>
                    <div class="code-block">application/json</div>
                </div>
                <div class="info-card">
                    <h4>Contact</h4>
                    <p>${apiInfo.contactEmail}</p>
                </div>
                <div class="info-card">
                    <h4>Company</h4>
                    <p>${apiInfo.companyName}</p>
                </div>
            </div>

            <h3>Key Features</h3>
            <ul class="features-list">
                <li>RESTful API design principles</li>
                <li>JSON request and response format</li>
                <li>Comprehensive error handling</li>
                <li>Rate limiting and security measures</li>
                <li>Pagination support for large datasets</li>
            </ul>
        </div>

        <!-- Authentication Section -->
        <div class="section">
            <h2>Authentication</h2>
            <div class="alert alert-info">
                <h3>${authInfo.type}</h3>
                <p>${authInfo.description}</p>
                <div class="code-block">${authInfo.example}</div>
            </div>
            <div class="alert alert-warning">
                <strong>Security Note:</strong> ${authInfo.notes}
            </div>
        </div>

        <!-- Endpoints Section -->
        <div class="section">
            <h2>API Endpoints</h2>
            <p>Complete list of available endpoints with detailed information about parameters, responses, and examples.</p>
            
            ${endpoints.map(endpoint => `
                <div class="endpoint">
                    <div class="endpoint-header">
                        <div class="endpoint-title">
                            <span class="method-badge" style="${getMethodColor(endpoint.method)}">${endpoint.method}</span>
                            <code class="endpoint-path">${endpoint.path}</code>
                            <span>${endpoint.title}</span>
                        </div>
                        <p>${endpoint.description}</p>
                    </div>
                    
                    <div class="endpoint-content">
                        <h3>Parameters</h3>
                        <table class="params-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Required</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${endpoint.parameters.map(param => `
                                    <tr>
                                        <td><code>${param.name}</code></td>
                                        <td>${param.type}</td>
                                        <td class="${param.required ? 'required' : 'optional'}">${param.required ? 'Yes' : 'No'}</td>
                                        <td>${param.description}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        
                        <h3>Responses</h3>
                        ${endpoint.responses.map(response => `
                            <div>
                                <span class="status-code status-${response.status}">${response.status}</span>
                                <span>${response.description}</span>
                                <div class="response-example">${response.example}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- Error Codes Section -->
        <div class="section">
            <h2>Error Codes</h2>
            <p>The API uses standard HTTP status codes to indicate the success or failure of requests.</p>
            
            <div class="error-section">
                ${errorCodes.map(error => `
                    <div class="error-item">
                        <div class="error-header">
                            <span class="status-code status-${error.code}">${error.code}</span>
                            <strong>${error.type}</strong>
                        </div>
                        <p><strong>Message:</strong> ${error.message}</p>
                        <p><strong>Description:</strong> ${error.description}</p>
                        <div class="code-block">{
  "error": {
    "code": ${error.code},
    "type": "${error.type}",
    "message": "${error.message}"
  }
}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d;">
            <p>Generated on ${new Date().toLocaleDateString()}</p>
            <p>© ${new Date().getFullYear()} ${apiInfo.companyName}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;

    return html;
  };

  const downloadDocumentation = () => {
    const htmlContent = generateDocumentation();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${apiInfo.title.replace(/\s+/g, '-').toLowerCase()}-documentation.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: FileText },
    { id: 'auth', label: 'Authentication', icon: Settings },
    { id: 'endpoints', label: 'Endpoints', icon: Code },
    { id: 'errors', label: 'Error Codes', icon: Trash2 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">API Documentation Generator</h1>
                <p className="text-sm text-gray-500">Create professional API docs in minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
              </button>
              <button
                onClick={downloadDocumentation}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download HTML</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`${showPreview ? 'grid grid-cols-2 gap-8' : ''}`}>
          {/* Form Section */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6">
                {/* Basic Info Tab */}
                {activeTab === 'basic' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">API Title</label>
                      <input
                        type="text"
                        value={apiInfo.title}
                        onChange={(e) => setApiInfo({ ...apiInfo, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="My API Documentation"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Version</label>
                        <input
                          type="text"
                          value={apiInfo.version}
                          onChange={(e) => setApiInfo({ ...apiInfo, version: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="1.0.0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                        <input
                          type="text"
                          value={apiInfo.companyName}
                          onChange={(e) => setApiInfo({ ...apiInfo, companyName: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Your Company"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={apiInfo.description}
                        onChange={(e) => setApiInfo({ ...apiInfo, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Comprehensive API documentation for developers"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Base URL</label>
                      <input
                        type="text"
                        value={apiInfo.baseUrl}
                        onChange={(e) => setApiInfo({ ...apiInfo, baseUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://api.example.com/v1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                      <input
                        type="email"
                        value={apiInfo.contactEmail}
                        onChange={(e) => setApiInfo({ ...apiInfo, contactEmail: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="api@example.com"
                      />
                    </div>
                  </div>
                )}

                {/* Authentication Tab */}
                {activeTab === 'auth' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Authentication Type</label>
                      <select
                        value={authInfo.type}
                        onChange={(e) => setAuthInfo({ ...authInfo, type: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Bearer Token</option>
                        <option>API Key</option>
                        <option>OAuth 2.0</option>
                        <option>Basic Auth</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={authInfo.description}
                        onChange={(e) => setAuthInfo({ ...authInfo, description: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Example Header</label>
                      <input
                        type="text"
                        value={authInfo.example}
                        onChange={(e) => setAuthInfo({ ...authInfo, example: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Security Notes</label>
                      <textarea
                        value={authInfo.notes}
                        onChange={(e) => setAuthInfo({ ...authInfo, notes: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                {/* Endpoints Tab */}
                {activeTab === 'endpoints' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">API Endpoints</h3>
                      <button
                        onClick={addEndpoint}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Endpoint</span>
                      </button>
                    </div>

                    <div className="space-y-6">
                      {endpoints.map((endpoint) => (
                        <div key={endpoint.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-md font-medium text-gray-900">Endpoint #{endpoint.id}</h4>
                            <button
                              onClick={() => deleteEndpoint(endpoint.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Method</label>
                              <select
                                value={endpoint.method}
                                onChange={(e) => updateEndpoint(endpoint.id, 'method', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option>GET</option>
                                <option>POST</option>
                                <option>PUT</option>
                                <option>DELETE</option>
                                <option>PATCH</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Path</label>
                              <input
                                type="text"
                                value={endpoint.path}
                                onChange={(e) => updateEndpoint(endpoint.id, 'path', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="/endpoint-path"
                              />
                            </div>
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                              type="text"
                              value={endpoint.title}
                              onChange={(e) => updateEndpoint(endpoint.id, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Endpoint Title"
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                              value={endpoint.description}
                              onChange={(e) => updateEndpoint(endpoint.id, 'description', e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Description of what this endpoint does"
                            />
                          </div>

                          {/* Parameters */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-3">
                              <label className="block text-sm font-medium text-gray-700">Parameters</label>
                              <button
                                onClick={() => addParameter(endpoint.id)}
                                className="text-blue-600 hover:text-blue-800 transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="space-y-3">
                              {endpoint.parameters.map((param, paramIndex) => (
                                <div key={paramIndex} className="grid grid-cols-12 gap-2 items-end">
                                  <div className="col-span-3">
                                    <input
                                      type="text"
                                      value={param.name}
                                      onChange={(e) => updateParameter(endpoint.id, paramIndex, 'name', e.target.value)}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                      placeholder="Parameter name"
                                    />
                                  </div>
                                  <div className="col-span-2">
                                    <select
                                      value={param.type}
                                      onChange={(e) => updateParameter(endpoint.id, paramIndex, 'type', e.target.value)}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                    >
                                      <option>string</option>
                                      <option>integer</option>
                                      <option>boolean</option>
                                      <option>array</option>
                                      <option>object</option>
                                    </select>
                                  </div>
                                  <div className="col-span-2">
                                    <select
                                      value={param.required}
                                      onChange={(e) => updateParameter(endpoint.id, paramIndex, 'required', e.target.value === 'true')}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                    >
                                      <option value="false">Optional</option>
                                      <option value="true">Required</option>
                                    </select>
                                  </div>
                                  <div className="col-span-4">
                                    <input
                                      type="text"
                                      value={param.description}
                                      onChange={(e) => updateParameter(endpoint.id, paramIndex, 'description', e.target.value)}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                      placeholder="Parameter description"
                                    />
                                  </div>
                                  <div className="col-span-1">
                                    <button
                                      onClick={() => deleteParameter(endpoint.id, paramIndex)}
                                      className="text-red-600 hover:text-red-800 transition-colors"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Response Example */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Response Example (JSON)</label>
                            <textarea
                              value={endpoint.responses[0]?.example || ''}
                              onChange={(e) => {
                                const updatedEndpoint = { ...endpoint };
                                if (updatedEndpoint.responses[0]) {
                                  updatedEndpoint.responses[0].example = e.target.value;
                                } else {
                                  updatedEndpoint.responses = [{ status: '200', description: 'Success', example: e.target.value }];
                                }
                                setEndpoints(endpoints.map(ep => ep.id === endpoint.id ? updatedEndpoint : ep));
                              }}
                              rows={6}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                              placeholder='{"message": "Success", "data": {}}'
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Error Codes Tab */}
                {activeTab === 'errors' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Error Codes</h3>
                      <button
                        onClick={addErrorCode}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Error</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {errorCodes.map((error, index) => (
                        <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-md font-medium text-gray-900">Error #{index + 1}</h4>
                            <button
                              onClick={() => deleteErrorCode(index)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Status Code</label>
                              <input
                                type="text"
                                value={error.code}
                                onChange={(e) => updateErrorCode(index, 'code', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="400"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Error Type</label>
                              <input
                                type="text"
                                value={error.type}
                                onChange={(e) => updateErrorCode(index, 'type', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Bad Request"
                              />
                            </div>
                          </div>

                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Error Message</label>
                            <input
                              type="text"
                              value={error.message}
                              onChange={(e) => updateErrorCode(index, 'message', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Invalid request parameters"
                            />
                          </div>

                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                              value={error.description}
                              onChange={(e) => updateErrorCode(index, 'description', e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Detailed description of when this error occurs"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
              <div 
                className="border border-gray-200 rounded-lg p-4 max-h-screen overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: generateDocumentation() }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiDocGenerator;