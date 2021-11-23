enum Tome {
    TOME_1 = "1",
    TOME_2 = "2",
    TOME_3 = "3",
    TOME_4 = "4",
    TOME_5 = "5",
}


function getPrice(books: number[]) {
    const count_books = {
        Tome.TOME_1: 0,
        Tome.TOME_2: 0,
        Tome.TOME_3: 0,
        Tome.TOME_4: 0,
        Tome.TOME_5: 0,
    };
    books.map(book => {
        count_books[Tome[book.toString()]] += 1;
    });
    console.dir(count_books);
}

getPrice([1, 1, 3, 4, 5]);