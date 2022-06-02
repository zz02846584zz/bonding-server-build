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
        username: 'bryan',
        password: 'f5_3Z~P/g3mVy2GC',
        database: 'bonding',
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
        redis: {
            host: '127.0.0.1',
            port: 6379,
            password: '^2YbZM=;;_fVT^Z~',
            db: 0,
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnByb2QuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiY29uZmlnL2NvbmZpZy5wcm9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0E7O0dBRUc7QUFDSCxrQkFBZTtJQUNiLEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxPQUFPO1FBQ2IsSUFBSSxFQUFFLFdBQVc7UUFDakIsSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsT0FBTztRQUNqQixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFFBQVEsRUFBRSxTQUFTO1FBQ25CLGdDQUFnQztRQUNoQyxXQUFXLEVBQUUsS0FBSztRQUNsQixPQUFPO1FBQ1AsT0FBTyxFQUFFLEtBQUs7UUFDZCxNQUFNO1FBQ04sT0FBTyxFQUFFLFNBQVM7S0FDbkI7SUFDRCxJQUFJLEVBQUU7UUFDSixZQUFZO1FBQ1osTUFBTSxFQUFFLEtBQUs7UUFDYixLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsSUFBSTtZQUNWLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsRUFBRSxFQUFFLENBQUM7U0FDTjtLQUNZO0NBQ0EsQ0FBQyJ9