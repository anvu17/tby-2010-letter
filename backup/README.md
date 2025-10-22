# Hướng dẫn sử dụng ID Mapping (1 người 1 ID)

Trang này hỗ trợ ánh xạ nội bộ một người nhận ↔ một ID duy nhất để bạn chỉ cần truyền 1 tham số duy nhất trên URL: `?id={id}`.

## Cách dùng nhanh
- Mở `index.html` với tham số `id`:
  - Ví dụ: `index.html?id=linh`
  - Hoặc: `index.html?id=1` (sử dụng trực tiếp ID bộ lời nhắn số 1)
- Tiêu đề trang sẽ tự động hiển thị: `Nhắn gửi {tên_người_nhận}`.
- Lời nhắn và hình ảnh cũng sẽ tự động hiển thị theo cấu hình.

Lưu ý: Với đường dẫn file `file:///`, query string thường vẫn hoạt động trên trình duyệt hiện đại. Nếu bạn gặp vấn đề, hãy chạy qua một web server cục bộ rồi truy cập `http://localhost.../index.html?id=...`.

## Cấu hình mapping ở đâu?
- Mở file: `style/messages.js`
- Tìm hằng số `RECIPIENT_MAP`. Đây là nơi cấu hình ID nội bộ (key) → `{ name, messageId }`.

Ví dụ cấu hình có sẵn:
```js
const RECIPIENT_MAP = {
  // Tỏ tình
  "linh": { name: "Linh", messageId: "1" },
  "em-yeu": { name: "Em yêu", messageId: "1" },

  // Sinh nhật
  "nam-bday": { name: "Nam", messageId: "2" },
  "me-birthday": { name: "Mẹ", messageId: "2" },

  // Tết
  "gia-dinh-tet": { name: "Gia đình", messageId: "3" },
  "ong-ba": { name: "Ông bà", messageId: "3" },

  // Cảm ơn
  "minh-thanks": { name: "Minh", messageId: "4" },
  "co-giao": { name: "Cô giáo", messageId: "4" }
};
```

- `messageId` phải trùng với key trong `MESSAGES` (ở cùng file) để chọn đúng bộ lời nhắn.

## Thêm một người mới
Giả sử bạn muốn thêm ID `chi-hao` cho Chị Hảo, dùng bộ lời nhắn số 2 (sinh nhật):
```js
"chi-hao": { name: "Chị Hảo", messageId: "2" },
```
Sau đó, bạn có thể truy cập: `index.html?id=chi-hao`

## Dùng trực tiếp ID bộ lời nhắn (tùy chọn)
Ngoài mapping, bạn có thể dùng trực tiếp số ID của bộ lời nhắn (chỉ cần `?id=` là số và tồn tại trong `MESSAGES`). Ví dụ:
- `index.html?id=1`
- `index.html?id=2`
Trong trường hợp này, tên người nhận sẽ lấy theo `MESSAGES[<id>].recipient`.

## Hình ảnh người nhận (tùy chọn)
Ứng dụng sẽ lấy ảnh theo đường dẫn: `./assets/{name}.jpg`, trong đó `{name}` là giá trị `name` trong mapping (ví dụ: `Linh` → `assets/Linh.jpg`).
- Nếu không có ảnh tương ứng, có thể không hiển thị được ảnh. Hãy đảm bảo tên file ảnh khớp chính xác với tên hiển thị.

## Khi ID không hợp lệ
- Nếu `id` không tìm thấy trong `RECIPIENT_MAP` và cũng không phải là số ID hợp lệ trong `MESSAGES`, trang sẽ fallback dùng bộ lời nhắn mặc định (ID "1") và tên mặc định là "bạn" (trừ khi bạn truyền thêm `&name=...`).

## Tùy biến thêm
- Bạn có thể tách `RECIPIENT_MAP` sang file riêng `style/ids.js` để dễ quản lý, sau đó đảm bảo file được import trước `messages.js` (ví dụ: `<script src="./style/ids.js"></script>` rồi tới `messages.js`). Hiện tại dự án đang đặt map trong `messages.js` để đơn giản.

Chúc bạn tuỳ biến vui vẻ và gửi được thật nhiều điều dễ thương! 💌
