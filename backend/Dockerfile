FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /app

COPY *.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish Backend.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:9.0

WORKDIR /app
COPY --from=build /app/out .

ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_URLS=http://+:8080

EXPOSE 8080

ENTRYPOINT ["dotnet", "Backend.dll"]
