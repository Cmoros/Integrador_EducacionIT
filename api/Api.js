export default class Api {
  getPaginationHbsObj(skip, limit, len) {
    const pages = [];
    let nextPage = 0;
    let prevPage = 0;
    for (let i = 0; i < len / limit; i++) {
      let current = false;
      if (i == skip / limit) {
        current = true;
        nextPage = i + 2;
        prevPage = i;
      }
      pages.push({ page: i + 1, current });
    }
    const first = skip == 0;
    const last = skip + limit >= len;
    return { pages, nextPage, prevPage, first, last, len };
  }

  getQueryObjectFromSearch(query) {
    if (!query) return {};
    const regExpName = RegExp(query, "i");
    return {
      $or: [
        { name: regExpName },
        { brand: regExpName },
        { category: regExpName },
        { shortDescription: regExpName },
      ],
    };
  }

  getOrderFormatted(order) {
    // console.log(order)
    if (!order) {
      console.log("order vacío");
      return {};
    }
    const splitted = order.split(":");
    const orderFormatted = {};
    for (let i = 0; i < splitted.length; i += 2) {
      const [name, value] = [splitted[i], splitted[i + 1]];
      orderFormatted[name] = value;
    }
    return orderFormatted;
  }
}
