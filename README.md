# #2020itu

Let's share your feeling throughout 2020 as a word or emoji!

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
