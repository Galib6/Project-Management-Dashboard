import QueryString from 'qs';

export class toolbox {
  public static appendPagination(path: string, page = 1, limit = 10) {
    return `${path}?page=${page}&limit=${limit}`;
  }
  public static queryNormalizer = (options: any) => {
    const pureOption = this.toCleanObject(options);

    if (pureOption?.query) {
      return options.query;
    }
    const queries: any = [];
    Object.entries(pureOption).map(([key, value]: any) => {
      const valueType = Array.isArray(value) ? 'array' : typeof value;
      if (key === 'sort') {
        return queries.push(`${key}=${JSON.stringify(value)}`);
      } else if (valueType === 'array' || key === 'filter') {
        return value.map((fOption) => {
          return queries.push(`${key}=${fOption}`);
        });
      } else if (valueType === 'object') {
        return queries.push(`${key}=${JSON.stringify(value)}`);
      } else {
        return queries.push(`${key}=${value}`);
      }
    });
    return queries.join('&');
  };
  public static isValidObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }
  public static isNotEmpty(value: any): boolean {
    return value !== null && value !== undefined && value !== '' && value.length !== 0;
  }

  public static toSafeValue(value: any): any {
    if (this.isNotEmpty(value)) {
      return value;
    }
    return '';
  }
  public static toSafeObject(value: any): any {
    if (this.isNotEmpty(value)) {
      return value;
    }
    return {};
  }
  public static toCleanObject(obj: { [key: string]: any }): any {
    if (this.isValidObject(obj)) {
      Object.keys(obj).forEach((key) => {
        if (this.isEmpty(obj[key])) {
          delete obj[key];
        }
      });
    }
    return this.toSafeObject(obj);
  }
  public static parseQueryParams<T = any>(url: string): T {
    const queryString = url.split('?')[1];
    if (!queryString) return {} as T;

    const query = {};
    const pairs = queryString.split('&');
    for (const pair of pairs) {
      const [key, value] = pair.split('=');
      if (!Number.isNaN(Number(value))) {
        query[decodeURIComponent(key)] = Number(value);
      } else if (key === 'sort') {
        query[decodeURIComponent(key)] = JSON.parse(decodeURIComponent(value || ''));
      } else {
        query[decodeURIComponent(key)] = decodeURIComponent(value || '');
      }
    }
    return query as T;
  }
  public static isEmpty(value: any): boolean {
    return (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      value === 'null' ||
      value === 'undefined'
    );
  }
  public static queryStringify = (options: any) => {
    if (options)
      return QueryString.stringify(options, {
        encodeValuesOnly: true,
      });

    return '';
  };
  public static removeDuplicateObjectsByProperty = (array, property) => {
    const uniqueObjects = [];
    const uniqueValues = new Set();
    array.forEach((obj) => {
      if (!uniqueValues.has(obj[property])) {
        uniqueValues.add(obj[property]);
        uniqueObjects.push(obj);
      }
    });
    return uniqueObjects;
  };
}
