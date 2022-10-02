class Global {
  static getServerDomain() {
    /* switch (process.env.NODE_ENV) {
      case "production":
        return "https://pollar.com/api";
      case "development":
        return "https://pollar-test.herokuapp.com";
      case "test":
        return "https://pollar-qa.herokuapp.com";
      case "local":
        return "http://localhost:3000";
    } */
    return "http://localhost:3000";
  }
  static getFrontDomain() {
    /* switch (process.env.NODE_ENV) {
      case "production":
        return "https://pollar.com";
      case "development":
        return "https://pollar.herokuapp.com";
      case "test":
      case "local":
        return "http://localhost:8080";
    } */
    return "http://localhost:8080";
  }

  static checkDevice() {
    return (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    );
  }
}

export default Global;
