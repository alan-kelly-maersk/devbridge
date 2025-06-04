# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["src/Maersk.DevBridge.Api/Maersk.DevBridge.Api.csproj", "src/Maersk.DevBridge.Api/"]
COPY ["nuget.config", "."]

# Set GitHub token as build arg for NuGet authentication
ARG GITHUB_TOKEN
RUN dotnet nuget add source --username USERNAME --password ${GITHUB_TOKEN} --store-password-in-clear-text --name github "https://nuget.pkg.github.com/Maersk-Global/index.json"
RUN dotnet restore "src/Maersk.DevBridge.Api/Maersk.DevBridge.Api.csproj"

# Copy everything else and build
COPY . .
RUN dotnet build "src/Maersk.DevBridge.Api/Maersk.DevBridge.Api.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "src/Maersk.DevBridge.Api/Maersk.DevBridge.Api.csproj" -c Release -o /app/publish

# Final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Maersk.DevBridge.Api.dll"]
