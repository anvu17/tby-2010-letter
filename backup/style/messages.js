// Định nghĩa các bộ lời chúc (đã chuyển sang chúc tập thể 20/10)
const MESSAGES = {
	// ID: 1 - Lời chúc 20/10 (tập thể)
	"1": {
		recipient: "mọi người",
		pages: [
			"❤️",
			"Chúc mừng Ngày Phụ Nữ Việt Nam 20/10!",
			"Gửi đến tất cả những người phụ nữ tuyệt vời",
			"luôn mạnh mẽ, dịu dàng và tỏa sáng.",
			"Chúc bạn luôn bình an, hạnh phúc",
			"và thật nhiều yêu thương mỗi ngày 🌸",
			"Cảm ơn vì đã làm thế giới này đẹp hơn",
			"bằng nụ cười và trái tim nhân hậu 💖",
			"Chúc một 20/10 rực rỡ và ngập tràn niềm vui!"
		]
	},
    
	// ID: 2 - Lời chúc sinh nhật
	"2": {
		recipient: "bạn",
		pages: [
			"Chúc mừng sinh nhật {name}! 🎂",
			"Hôm nay là một ngày đặc biệt,",
			"Vì đó là ngày {name} đến với thế giới này.",
			"Mong rằng tuổi mới của {name},",
			"Sẽ tràn đầy niềm vui và hạnh phúc.",
			"Những ước mơ của {name},",
			"Sẽ trở thành hiện thực.",
			"Mọi điều tốt đẹp nhất,",
			"Sẽ đến với {name}.",
			"Chúc {name} sinh nhật vui vẻ! 🎉"
		]
	},
    
	// ID: 3 - Lời chúc Tết
	"3": {
		recipient: "gia đình",
		pages: [
			"Chúc mừng năm mới {name}! 🎊",
			"Xuân về rộn ràng,",
			"Mang theo niềm vui mới.",
			"Chúc {name} luôn mạnh khỏe,",
			"An khang thịnh vượng.",
			"Vạn sự như ý,",
			"Phát tài phát lộc.",
			"Chúc {name} năm mới hạnh phúc! 🌸"
		]
	},
    
	// ID: 4 - Lời cảm ơn
	"4": {
		recipient: "bạn",
		pages: [
			"Cảm ơn {name}! 💝",
			"Vì đã luôn ở bên cạnh,",
			"Khi mình cần nhất.",
			"Những khoảnh khắc bên {name},",
			"Là những kỷ niệm đẹp nhất.",
			"Mình thật may mắn,",
			"Khi có {name} bên cạnh.",
			"Cảm ơn {name} vì tất cả! 🙏"
		]
	}
};

// Ánh xạ ID nội bộ -> tên người nhận và ID bộ lời chúc
// Thêm/sửa trong file này để cấu hình nhanh: index.html?id=<key>
const RECIPIENT_MAP = {
	// Tỏ tình
	"linh": { name: "Linh", messageId: "1" },
	"em-yeu": { name: "Em yêu", messageId: "1" },

	// Ví dụ thêm mới
	"0": { name: "Nguyễn Văn A", messageId: "1" },
	"198": { name: "Thu", messageId: "1" },

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

// Hàm lấy thông tin lời chúc (chỉ dùng bộ 20/10 chung + ảnh cố định)
function getMessageData() {
    const generic = MESSAGES['1'];
    return {
        recipient: generic.recipient, // "mọi người"
        pages: generic.pages,
        imageUrl: `./assets/img.jpg`
    };
}
