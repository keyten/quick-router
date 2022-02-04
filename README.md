# quick-router
Say, we have folder structure:
```
src/
├─ routes/
│  ├─ auth/
│  │  ├─ post_login.ts
│  │  ├─ post_register.ts
│  │  ├─ post_logout.ts
│  ├─ entity_name/
│  │  ├─ get.ts
│  │  ├─ get.id.ts
│  │  ├─ post.ts
│  │  ├─ put.id.ts
│  │  ├─ delete.id.ts
├─ app.ts
```

And every ts file has exported the handler by default.
```ts
export default (req, res) => res.json({});
// or:
export default [bodyMiddleware, sessionMiddleware, (req, res) => res.end()];
```

Then we need to install the router:
```
npm install --save quick-router
```

And import it in app.ts:
```ts
import quickRouter from 'quick-router';

express.use(quickRouter());
```

As a result, we have the next handlers based on the folder structure:
- POST /auth/login
- POST /auth/register
- POST /auth/logout
- GET /entity_name
- GET /entity_name/:id
- POST /entity_name
- PUT /entity_name/:id
- DELETE /entity_name/:id

#### Examples of file names

- `/routes/get.ts` -> `GET /`
- `/routes/get_foo.ts` -> `GET /foo`
- `/routes/foo/get.ts` -> `GET /foo`
- `/routes/foo/post.ts` -> `POST /foo`
- `/routes/foo/get_bar.ts` -> `GET /foo/bar`
- `/routes/foo/bar/get.ts` -> `GET /foo/bar`
- `/routes/get.id.ts` -> `GET /:id`
- `/routes/get_foo.id.ts` -> `GET /foo/:id`
- `/routes/get.id1.id2.id3.ts` -> `GET /:id1/:id2/:id3`

Only js / ts extension in files.

### Additional options:
#### routesDir ` = 'routes'`
The router looks for the handlers in `path.join(__dirname, routesDir)`

#### fileNameToRoute
The function that returns the route path based on the file path, so you can change the way it's processed.

We want to return object `{ method: string; path: string; }` from this function. Returning null will cause ignoring the file.

```ts
express.use(quickRouter({
  fileNameToRoute: function (filePath) {
    // file: /routes/entity_name/index.ts
    // filePath = 'entity_name/index.ts'
    const fileName = filePath.split('/').last();
    const extension = fileName.split('.').last();
    fileName = fileName.split('.').removeLast().join('.');
    return {
      method: fileName === 'index' ? 'get' : fileName,
      path: filePath.split('.').removeLast().join('.')
    };
  }
}));
```
