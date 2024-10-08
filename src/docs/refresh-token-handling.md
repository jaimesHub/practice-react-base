# Handling Refresh Token while Access Token expired

- Why 401 ?
    - Token hết hạn
    - Sai token
    - Ko truyền token 
- Điều chỉnh BE để config thời gian sống của AccessToken
    - env
        - JWT_ACCESS_EXPIRE_IN=15s (focus this)
        - JWT_REFRESH_EXPIRE_IN=1h (update later)
    - npm ms
- Tái hiện lỗi
    - /login
    - user@gmail.com / 123456
    - check network (201)
    - F5 page
    - check network (401)
- Nguyên nhân
    - Có thể access_token hết hạn
- Solution
    - Viết 1 cơ chế cho axios để gọi luôn API và sử dụng refresh_token 
    - Cơ chế `retry`
        - Ko cần cài package: https://www.npmjs.com/package/axios-retry
        - retry on 401: https://github.com/axios/axios/issues/934 
- Problem
    - Sau khi dùng refresh token để authenticate lại, vẫn k thể hiện tên user 
    - Do ko nạp vào redux sau khi sd refresh token
    - Trong thực tế, `handleRefreshToken` có thể trả về 401 --> loop vô hạn 
        - https://stackoverflow.com/questions/73363862/axios-retry-infinite-loop
        - Solution: đặt 1 flag --> đánh dấu đã retry rồi lần sau ko retry nữa 
        - `const NO_RETRY_HEADER = 'x-no-retry'`

# Fix issue Refresh Token expired
- Tái hiện
    - Call /admin
    - F5 (/refresh) --> statusCode: 400, message: `Không tồn tại refresh_token ở cookies`
    - update .env: `JWT_REFRESH_EXPIRE_IN=10s`
- Fix
    - Redirect `/login`
    - axios customize
