create table if not exists `t_mcl_user` (
  `id`   bigint unsigned not null  auto_increment,
  `open_id`           varchar(64)     not null  default '',
  `status`            tinyint         not null  default 0,
  `dj_id`             tinyint         not null  default 0,
  `submit_count`      tinyint         not null  default 0,
  `updated_at`  datetime        not null  default current_timestamp
  on update current_timestamp,

  primary key (`id`),
  constraint open_id_uk unique (`open_id`)
)
  engine = innodb
  default charset = utf8mb4;
