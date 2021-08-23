create table if not exists breeds (
    id serial PRIMARY KEY,
    title varchar(30),
    description text
);

create table if not exists cats (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title varchar(30),
    price int2,
    description text,
    birthday date,
    imgLink text,
    breedId serial,
    foreign key (breedId) references "breeds" ("id")
);

create table if not exists kittens (
    cat_id uuid,
    count int2,
    foreign key (cat_id) references "cats" ("id")
);

insert into breeds(title, description) values
('Abyssinian Cat', 'Abyssinians are highly intelligent and intensely inquisitive. They love to investigate and will leave no nook or cranny unexplored. They’re sometimes referred to as “Aby-grabbys” because they tend to take things that grab their interest. The playful Aby loves to jump and climb. Keep a variety of toys on hand to keep her occupied, including puzzle toys that challenge her intelligence.'),
('Bengal Cat', 'Bengal Cats are curious and confident with the tameness of a domestic tabby and the beauty of an Asian Leopard Cat. Learn more about Bengals and their playful personality, plus information on their health and how to feed them.')

insert into cats (id, title, price, birthday, imgLink, breedid) VALUES
('b53b0c36-6397-4719-8104-29e6d524f03e', 'Oly', 500, '2021-08-05', 'https://www.thesprucepets.com/thmb/7p0TopOHEHX3aQsdYzRdidbS0Lo=/2121x1414/filters:fill(auto,1)/GettyImages-165827729-efc11c02690f457a81ef6ccbfa8eb34d.jpg', 1),
('ae740c8b-3796-499c-b145-20ad6320221b', 'Tom', 500,'2021-08-09', 'https://cattime.com/assets/uploads/gallery/abyssinian-cats-and-kittens/abyssinian-1.jpg', 1),
('38915df8-80ef-46f1-8665-52a952a83c67', 'Sam', 550, '2021-08-09', 'https://www.awesomeinventions.com/wp-content/uploads/2019/08/thor-the-bengal-cat-green-eyes.jpg', 2);

insert into kittens (cat_id, count) VALUES
('b53b0c36-6397-4719-8104-29e6d524f03e', 3),
('ae740c8b-3796-499c-b145-20ad6320221b', 5),
('38915df8-80ef-46f1-8665-52a952a83c67', 5)
