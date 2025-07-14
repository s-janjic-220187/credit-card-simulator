# Test login API endpoint
$body = @{
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

$headers = @{
    "Content-Type" = "application/json"
}

Write-Host "Testing backend login endpoint..."
Write-Host "URL: http://localhost:3000/api/users/login"
Write-Host "Body: $body"

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/users/login" -Method POST -Body $body -Headers $headers
    Write-Host "✅ Login successful!" -ForegroundColor Green
    Write-Host "Response: $($response | ConvertTo-Json -Depth 3)" -ForegroundColor Green
} catch {
    Write-Host "❌ Login failed!" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    
    # Try to get the detailed error response
    try {
        $result = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($result)
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response body: $responseBody" -ForegroundColor Red
    } catch {
        Write-Host "Could not read response body" -ForegroundColor Red
    }
}
