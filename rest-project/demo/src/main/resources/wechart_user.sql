CREATE TABLE wechat_user(
  id INT primary key,
  open_id VARCHAR(50) NOT NULL ,
  nickname VARCHAR(100) NOT NULL ,
  head_img_url VARCHAR(100) NOT NULL ,
  sex INT(1) NOT NULL ,
  country VARCHAR(20),
  province VARCHAR(20),
  city VARCHAR(20),
  createtime DATETIME NOT NULL ,
  modifytime TIMESTAMP
);
