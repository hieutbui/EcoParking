# EcoParking
# Quy chuẩn về code

---

## 1. Về việc sử dụng ngôn ngữ và thay đổi ngôn ngữ

- Tất cả string đều phải đều phải có ngôn ngữ
- ngôn ngữ được để trong app/assets/locales

## 2. Định nghĩa các file dùng chung trong chương trình

- Các component định nghĩa trong shared/components
- Các hàm tiện ích
- Về việc lưu và sử dụng config
- Các hằng số định nghĩa trong app/constants/Constants.js
- Style, Font, FontSize định nghĩa trong Styles.js
- Icon, Image, Color định nghĩa trong AppColors.js, AppIcons.js, AppImages.js

## 3. Quy định về comment

- Các component dùng chung phải có comment giải thích đầu vào cụ thể ( ví dụ: Divider.js)
- Khi viết code vào các file dùng chung ( ví dụ: Const.js, Styles.js, Assets.js ..) thì nên có comment để giải thích việc thêm code đó để làm gì
  và nên viết tên của mình vào comment để biết được ai thêm. Ví dụ: <br/>
  // hieubt: add padding in home screen <br/>
  const paddingHome = 100

## 4. Về việc chuyển trang

- Chuyển trang sẽ được thực hiện trong NavigatorUtil.js (cần comment giải thích đầy đủ đầu vào)
- Tên các màn hình đặt trong ScreenNames.js không điền trực tiếp text

## 5. Về các màn hình Test

## 7. Side effect
Ứng dụng sẽ dùng redux để lưu các trạng thái và redux-thunk để thực hiện các side effect (công việc liên quan đến kết nối mạng hoặc công việc cần thời gian xử lý). Sau đó sẽ lưu vào redux. redux + redux-thunk => slice toolkit. Tất cả sẽ được viết trong slice.

## 8. Cấu trúc của project

1.  app/assets: chứa tất cả files, icons, images, locales, colors
2.  app/controllers/api: gọi api
3.  app/controllers/hooks: chứa các hook của ứng dụng
4.  app/controllers/listener: chứa các component có nhiệm vụ lắng nghe hoặc xử lý sự kiện (ko có giao diện)
5.  app/controllers/socket: quản lý socket
6.  app/controllers/slice: chứa các slice chính của ứng dụng: AppSlice, AccountSlice, AppSlice, PackageSlice, ServiceSlice,
7.  app/screens: chứa các màn hình ứng dụng

## 9. Về việc cài thêm cái package

Dùng "yarn add" thay cho "npm install"

# Một số lỗi thường gặp

---

# Lỗi build react-native-i18n trên android

- mở file build.gradle của react-native-i18n, thay compile bằng api, line 25

# Dùng patch-package để sửa lib trong node_modules

- Mở file thư viện đang dùng, sửa để fix lỗi hiện tại
- Lưu lại thay đổi để cho mỗi lần cài lib các phần sửa được vá

```bash
yarn patch-package <package_name> --use-yarn
```

hoặc

```bash
npx patch-package <package_name>
```
***

#Docker
- Tạo 1 file Dockerfile
```bash
vi Dockerfile
```
- Sau đó thêm nội dung vào file:
	FROM node:16
	WORKDIR .
	COPY . .
	RUN yarn install --production
	CMD ["node", "./index.js"]
	EXPOSE 3000
- Build docker image
```bash
docker build -t <name>
```bash
- Kiểm tra image
```bash
docker images
```
- Running
```bash
Run docker -dp <localport>:<image port> <name>
```bash
