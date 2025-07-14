# Test if user exists in database
$body = @{
    email = "test@example.com"
} | ConvertTo-Json

$headers = @{
    "Content-Type" = "application/json"
}

Write-Host "Testing if user exists..."
Write-Host "URL: http://localhost:3000/api/users/test-user-exists"

# First, let's just check if the API is working by hitting health
try {
    $healthResponse = Invoke-RestMethod -Uri "http://localhost:3000/health" -Method GET
    Write-Host "✅ Backend health check passed!" -ForegroundColor Green
    Write-Host "Health: $($healthResponse | ConvertTo-Json)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend health check failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test basic API endpoint
try {
    $pingResponse = Invoke-RestMethod -Uri "http://localhost:3000/ping" -Method GET
    Write-Host "✅ Backend ping check passed!" -ForegroundColor Green
    Write-Host "Ping: $($pingResponse | ConvertTo-Json)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend ping check failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
