create table if not exists Products
(
    id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title       varchar(30),
    price       int2,
    description text,
    imgLink     text
);

create table if not exists Stocks
(
    product_id uuid,
    count      smallint,
    foreign key (product_id) references Products ("id")
);

insert into Products (id, title, price, description, imgLink)
VALUES ('e84775fd-31b4-4eb3-9c95-fdd2302d4be7', 'Grey Fish', 10, 'Good choice for your kitten',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4rk5e86QxMOivvzonBs_p_YjlRiyCSQ_50A&usqp=CAU'),
       ('edb92f50-5d09-453b-97f3-5ca802dde63e', 'Ball', 5, 'Small ball', 'https://m.media-amazon.com/images/I/71cXwgCUrYL._AC_SX466_.jpg'),
       ('041c2e4b-4f42-4da7-9f8f-bdd14638b996', 'Fishes', 15, 'More fishes',
        'https://i5.walmartimages.com/asr/d769ca9d-b1d3-4af1-bf6b-3525d7d65590_1.a611fe52f3c1820f74e03326a76346a8.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff')

insert into Stocks (product_id, count)
VALUES ('e84775fd-31b4-4eb3-9c95-fdd2302d4be7', 100),
       ('edb92f50-5d09-453b-97f3-5ca802dde63e', 20),
       ('041c2e4b-4f42-4da7-9f8f-bdd14638b996', 30)
