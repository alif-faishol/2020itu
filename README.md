# #2020itu

![ci status](https://github.com/alif-faishol/2020itu/workflows/ci/badge.svg)

[![Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=279063&theme=light)](https://www.producthunt.com/posts/2020itu?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-2020itu)

Let's share your feeling throughout 2020 as a word or emoji!

https://2020itu.com

## API

You can access data gathered with this website via an API.

### Get Submitted Words

`GET https://2020itu.com/api/words`

Query parameters:
| Param         | Description | Mandatory |
| ------------- | ----------- | --------- |
| date-start    | filter responses from specified date, uses ISO Date string (ex: 2020-12-20T23:19:38.007Z) | yes if date-end specified, otherwise no |
| date-end      | - | yes if date-start specified, otherwise no |
| size          | how many items returned from API, default `50` | no |
| next-page-key | use nextPageKey from response to get items from next page | no |

Response:
```ts
type Response = {
  data: Array<{
    // ISO Date string
    submitted_at: string;
    word: string;
  }>;
  // Unavailable in last page
  nextPageKey?: string;
}
```

### Get Word Count
Check how many a word has been submitted

`GET https://2020itu.com/api/word-count`

Query parameters:
| Param         | Description | Mandatory |
| ------------- | ----------- | --------- |
| word          | a word to count | yes |

Response:
```ts
type Response = {
  data: {
    word: string;
    count: number;
  };
}
```
