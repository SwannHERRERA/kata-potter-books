type SagaCount = Map<number, number>

const initialCountBook: SagaCount = new Map([
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
]);

const discountMap: Map<number, number> = new Map([
    [5, 0.75],
    [4, 0.8],
    [3, 0.9],
    [2, 0.95],
    [1, 1]
])

const bookPrice = 8;

function hasBooks(countBooks: SagaCount): boolean {
    return Array.from(countBooks.values()).some(countBook => countBook > 0);
}

function countCollection(countBooks: SagaCount): number {
    return Array.from(countBooks.keys())
        .reduce((prev, key) =>
            countBooks.get(key) != 0 ? 1 + prev : prev, 0);
}

function computeCollectionPrice(collectionCount: number) {
    return (discountMap.get(collectionCount) ?? 1) * bookPrice * collectionCount;
}

function groupByBooks(books: number[]) {
    const countBooks = initialCountBook;

    books.map(book => {
        countBooks.set(book, (countBooks.get(book) ?? 0) + 1);
    });
    return countBooks;
}

function removeComputedBooks(countBooks: SagaCount) {
    countBooks.forEach((bookCount, key, map) => {
        if (bookCount > 0) {
            map.set(key, bookCount - 1);
        }
    })
}

function getPrice(books: number[]): number {
    let price = 0;
    const countBooks = groupByBooks(books);

    while (hasBooks(countBooks)) {
        const collectionCount = countCollection(countBooks);
        price += computeCollectionPrice(collectionCount);
        removeComputedBooks(countBooks);
    }

    return price;
}

console.log(getPrice([1, 2, 1, 2]));
console.log(getPrice([1, 1, 1, 1, 1]));
console.log(getPrice([1, 2, 3, 4, 5]));
console.log(getPrice([1, 1]));
console.log(getPrice([1, 2, 3]));
console.log(getPrice([]));
console.log(getPrice([1]));
console.log(getPrice([1, 1, 2]));