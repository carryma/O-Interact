CREATE TABLE wechat_user(
  open_id VARCHAR(50) NOT NULL primary key,
  nickname VARCHAR(100) NOT NULL ,
  head_img_url VARCHAR(100) NOT NULL ,
  sex INT(1) NOT NULL ,
  country VARCHAR(20),
  province VARCHAR(20),
  city VARCHAR(20),
  createtime DATETIME NOT NULL ,
  modifytime TIMESTAMP
);

CREATE TABLE customer
(
  id int  primary key auto_increment,
  name varchar(100) not null;
  password varchar(100) not null;
);
