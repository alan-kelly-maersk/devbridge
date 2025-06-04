FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["DevBridge.Api/DevBridge.Api.csproj", "DevBridge.Api/"]
COPY ["nuget.config", "."]
ARG GITHUB_PAT
RUN dotnet nuget remove source github || true && \
    dotnet nuget add source "https://nuget.pkg.github.com/Maersk-Global/index.json" \
    --name github \
    --username alan-kelly-maersk \
    --password ${GITHUB_PAT} \
    --store-password-in-clear-text
RUN dotnet restore "DevBridge.Api/DevBridge.Api.csproj"
COPY . .
WORKDIR "/src/DevBridge.Api"
RUN dotnet build "DevBridge.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DevBridge.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DevBridge.Api.dll"]
