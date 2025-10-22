// Định nghĩa bộ lời chúc 20/10
const MESSAGES = {
	// ID: 1 - Lời chúc 20/10 cá nhân hóa
	"1": {
		recipient: "cậu",
		pages: [
			" ",
			"Nhân ngày Phụ nữ Việt Nam 20/10,",
			"chúng tớ chúc {name} luôn xinh đẹp,",
			"tự tin, vui vẻ",
			"và thành công trong mọi việc.",
			"Hy vọng mỗi ngày đều đến với {name}",
			"bằng năng lượng tràn đầy",
			"và những điều dễ thương nhất.",
			"Yêu nhiềuuuuu 💖"
		]
	}
};

// Ánh xạ ID nội bộ -> tên người nhận và ID bộ lời chúc
// Thêm/sửa trong file này để cấu hình nhanh: index.html?id=<key>
const RECIPIENT_MAP = {
	// Danh sách cá nhân (chúc 20/10)
	"1": { name: "Đặng Minh Anh", messageId: "1" },
	"2": { name: "Nguyễn Thị Ngọc Lan", messageId: "1" },
	"3": { name: "Lê Thị Diệu", messageId: "1" },
	"4": { name: "Nguyễn Thị Thu Hiền", messageId: "1" },
	"5": { name: "Đinh Thị Thu Hà", messageId: "1" },
	"6": { name: "Thảo Thảo", messageId: "1" },
	"7": { name: "Vũ Ngọc Dịu", messageId: "1" },
	"8": { name: "Nguyễn Thị Thanh Thuý", messageId: "1" },
	"9": { name: "Nguyễn Thị Mỹ Duyên", messageId: "1" },
	"10": { name: "Nguyễn Thảo Ly", messageId: "1" },
	"12": { name: "nội thất sư Lưu Hoài Thơm", messageId: "1" },
	"13": { name: "Nguyễn Thị Bích Thuỷ", messageId: "1" },
	"14": { name: "Thanh con thầy vợ bạn gái nhân văn", messageId: "1" },
	"15": { name: "Nguyễn Vũ Tuệ Minh", messageId: "1" },
	"16": { name: "Linh nhịp cầu hán ngữ", messageId: "1" },
	"17": { name: "Nguyễn Thị Bảo Châu", messageId: "1" },
	"18": { name: "em Hà Chip Chip", messageId: "1" },
	"19": { name: "Phạm Thị Hương", messageId: "1" },
	"20": { name: "Nguyễn Thanh Hiền", messageId: "1" },
	"21": { name: "Đoàn Thị Ngọc Anh", messageId: "1" },
	"22": { name: "Hoàng Lan Hương", messageId: "1" },
	"23": { name: "Lê Thị Quỳnh Như", messageId: "1" },
	"24": { name: "Trần Yến Nhi", messageId: "1" },
	"25": { name: "Nguyễn Thị Hoàng Yến", messageId: "1" },
	"26": { name: "Ngô Thị Thanh Hương", messageId: "1" },
	"27": { name: "Vũ Thị Ngọc Huyền", messageId: "1" },
	"28": { name: "Phạm Hà Thuy", messageId: "1" },
	"29": { name: "Phạm Thị Thu Trang", messageId: "1" },
	"30": { name: "Vân Khánh kawaii :3 🐰", messageId: "1" },
	"31": { name: "Linh xue hanyu ở ussh", messageId: "1" },
	"32": { name: "chị Huyền xue hanyu ở hànú", messageId: "1" },
	"33": { name: "Phạm Hoài Anh", messageId: "1" },
	"34": { name: "Vũ Thị Minh Anh", messageId: "1" },
	"35": { name: "chị Thương Huyền", messageId: "1" },
	"36": { name: "chị Hà Thu", messageId: "1" },
	"37": { name: "chị Kiều Trinh", messageId: "1" },
	"38": { name: "chị Nga", messageId: "1" }
};

// Hàm lấy thông tin lời chúc từ URL parameters
// Chỉ cần 1 parameter: ?id={id}
// - Nếu id trùng RECIPIENT_MAP: lấy name và messageId tương ứng, ảnh từ assets/{id}.jpg
// - Nếu id không hợp lệ: dùng thông điệp mặc định
function getMessageData() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = (urlParams.get('id') || '').trim();

    let resolvedMessageId;
    let resolvedRecipientName;
    let imageUrl;

    if (idParam && typeof RECIPIENT_MAP !== 'undefined' && RECIPIENT_MAP[idParam]) {
        resolvedMessageId = RECIPIENT_MAP[idParam].messageId;
        resolvedRecipientName = RECIPIENT_MAP[idParam].name;
        // Ảnh theo id: assets/{id}.jpg, fallback về default.jpg nếu lỗi
        imageUrl = `./assets/${idParam}.jpg`;
    } else {
        // ID không hợp lệ hoặc không có: dùng bộ mặc định
        const fallbackId = '1';
        const generic = MESSAGES[fallbackId];
        return {
            recipient: generic.recipient || 'cậu',
            pages: generic.pages,
            imageUrl: `./assets/default.jpg`
        };
    }

    const messageData = MESSAGES[resolvedMessageId];
    return {
        recipient: resolvedRecipientName,
        pages: messageData.pages,
        imageUrl: imageUrl
    };
}
