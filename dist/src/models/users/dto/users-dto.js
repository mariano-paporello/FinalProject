"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asDto = void 0;
var usersDTO = /** @class */ (function () {
    function usersDTO(user) {
        this.id = user._id;
        this.gmail = user.gmail;
        this.username = user.username;
        this.password = user.password;
        this.age = user.age;
        this.image = user.image;
        this.phoneNumber = user.phoneNumber;
    }
    return usersDTO;
}());
function asDto(users) {
    if (Array.isArray(users)) {
        var newUsers = users.map(function (element) { return new usersDTO(element); });
        return newUsers;
    }
    else {
        var user = new usersDTO(users);
        return user;
    }
}
exports.asDto = asDto;
