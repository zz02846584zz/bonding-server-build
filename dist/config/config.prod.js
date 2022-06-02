"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 本地开发 npm run dev 读取的配置文件
 */
exports.default = {
    orm: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'cool',
        // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
        synchronize: false,
        // 打印日志
        logging: false,
        // 字符集
        charset: 'utf8mb4',
    },
    cool: {
        // 是否自动导入数据库
        initDB: false,
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnByb2QuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiY29uZmlnL2NvbmZpZy5wcm9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0E7O0dBRUc7QUFDSCxrQkFBZTtJQUNiLEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxPQUFPO1FBQ2IsSUFBSSxFQUFFLFdBQVc7UUFDakIsSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsTUFBTTtRQUNoQixRQUFRLEVBQUUsUUFBUTtRQUNsQixRQUFRLEVBQUUsTUFBTTtRQUNoQixnQ0FBZ0M7UUFDaEMsV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTztRQUNQLE9BQU8sRUFBRSxLQUFLO1FBQ2QsTUFBTTtRQUNOLE9BQU8sRUFBRSxTQUFTO0tBQ25CO0lBQ0QsSUFBSSxFQUFFO1FBQ0osWUFBWTtRQUNaLE1BQU0sRUFBRSxLQUFLO0tBQ0E7Q0FDQSxDQUFDIn0=