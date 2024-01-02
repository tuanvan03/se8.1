# se8.1
# Ứng Dụng Giao Đồ Ăn React Native

## Mô tả

Đây là một ứng dụng di động được phát triển bằng React Native, nhằm mục đích giúp người dùng đặt hàng đồ ăn một cách thuận tiện. Ứng dụng hỗ trợ cả nền tảng iOS và Android, mang lại trải nghiệm người dùng mượt mà và hiệu quả.
## Tính năng
1. **Đăng nhập:** Cho phép người dùng đăng nhập dựa trên 2 tiêu chí username và password, có tính năng lưu đăng nhập trong vòng 24 tiếng, ngoài 24 tiếng người dùng sẽ phải đăng nhập lại.
2. **Đăng kí:** Cho phép người dùng đăng kí tài khoản bằng gmail, chọn quốc gia và xác thực bằng số điện thoại, có thể chọn đăng kí bằng tài khoản facebook hoặc google.
3. **Quên mật khẩu:** Gửi yêu cầu cấp lại mật khẩu qua email.
4. **Màn hình chính:** Có hiển thị các nhà hàng với các lượt đánh giá cùng miều tả để người dùng dễ dàng lựa chọn, khi bấm vào sẽ ra các loại đồ ăn được bán trong cửa hàng và người dùng có thể chọn để mua.
5. **Đồ ăn:** Đồ ăn đa dạng phong phú, nhiều thể loại, có nhiều miêu tả như nguyên liệu, hương vị thu hút người dùng chọn mua.
6. **Đánh dấu:** Người dùng có thể đáh dấu những nhà hàng yêu thích để cho vào danh sách chờ.
7. **Thanh toán ở giỏ hàng:** Người dùng khi chọn mua sản phẩm sẽ được hiển thị bên màn hình thanh toán và được tự động tính tiền, có áp dụng mã giảm giá nếu có.
8. **Tài khoản:** Hiển thị thông tin người dùng, và các trạng thái cài đặt ngôn ngữ, tính năng và có chức năng đăng xuất.

Lưu ý: Có một số tính năng vẫn còn đang phát triển và hiện chỉ có phần hiển thị như: đăng nhập bằng facebook, google, xác minh số điện thoại, gửi mật khẩu qua gmail hay lọc các loại đồ ăn theo loại.

## Cài Đặt
1. *Cài đặt react-native CLI:* https://reactnative.dev/docs/environment-setup?guide=native
3. *Cài đặt Android studio:* https://developer.android.com/studio
4. *Cài đặt MongoDB Compass:* https://www.mongodb.com/products/tools/compass
5. *Cài đặt Postman:* https://www.postman.com/downloads/
6. *Cài đặt các package:*
- Package:
   ```bash
    npx express-generator my-express-app
    npm install @react-navigation/native
    npm install react-native-screens react-native-safe-area-context
    npm install @react-navigation/stack
    npm install react-native-gesture-handler
    npm install @react-navigation/bottom-tabs
    npm install --save react-native-vector-icons
    yarn add lottie-react-native
    npm install axios
    npm install @react-native-async-storage/async-storage
    npm install @reduxjs/toolkit
    npm install @reduxjs/toolkit react-redux
    npm install redux
    npm install react-redux
    npm install redux-thunk
    npm install react-native-maps
    ```
Tùy thuộc mỗi package mà có cách thêm đường dẫn khác trong.
- Thư viện
   - Country flag: https://flagsapi.com/
   - Icon: https://icons8.com/
   - Ảnh: https://undraw.co/illustrations
   - Hoạt ảnh: https://lottiefiles.com/
        

## Cấu Trúc Thư Mục
1. *Front-end:*
   Tất cả đều nằm trong thư mục src để dễ quản lí:
    - */actions*: Tạo action trong redux và quản lí các trạng thái đăng nhập, đánh dấu hay thêm hàng vào giỏ
    - */assets*: Chứ ảnh và phông chữ
    - */components*: Chứa các thành phần React tái sử dụng.
    - */contants*: Quy ước tên cho ảnh, phông chữ, cờ quốc gia hay API.
    - */navigator*: Cài đặt điều hướng và định nghĩa màn hình.
    - */reducres*: Xác định cách trạng thái của ứng dụng thay đổi khi các actions được gửi.
    - */screens*: Chứa các màn hình chính của ứng dụng.
    - */services*: Gọi API
    - */utils*: Chứa các tiện ích hỗ trợ
3.  *Back-end:*
    - */init_data*: Chứa dữ liệu cho nhà hàng và đồ ăn
    - */routes*: Chứa mã nguồn iOS của ứng dụng.
    - */services*: Chứa mã nguồn chính của ứng dụng.
    - */static*: Chứa hình ảnh, biểu tượng nhà hàng, món ăn
    - *app.js*: Khởi tạo, cấu hình sever.
    - *config.js*: Kết nối sever và dữ liệu MongoDB
## Sử Dụng
1. Clone code về máy:
   ```bash
       https://github.com/tuanvan03/se8.1.git
   ```
2. Cài đặt MongoDB cho VSCode và kết nối với MongoDB Compass.
   - Cài đặt trong Mongo tên và collection như trong file config.js ở back-end.
   - Import dữ liều từ 2 file foods.json và restaurants.json vào collection tương ứng.
4. Thay đổi địa chỉ IP của máy trong package.json ở cả back-end và front-end.
5. Khởi chạy máy ảo andriod(Ở đây chúng em đang dùng máy Pixel 5)
6. Chạy câu lệnh đồng thời ở cả 2 folder back-end và front-end:
     ```bash
       npm start
     ```
npm start

## Nguồn tham khảo
1. *UI Design*: https://www.behance.net/gallery/104564545/Food-Door-app?tracking_source=search_projects_recommended%7Cfood+delivery+mobile+app
2. *Link github*: https://github.com/ameenfarook/food_delivery_app
