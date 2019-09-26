let baseUrl = "";
switch (process.env.NODE_ENV) {
  case "development":
    baseUrl = Window.devApiUrl;
    break;
  case "production":
    baseUrl = Window.releaseUrl;
    break;
  case "test":
    baseUrl = Window.testUrl;
    break;
  default:
    baseUrl = Window.devApiUrl;
    break;
}
export default baseUrl;
