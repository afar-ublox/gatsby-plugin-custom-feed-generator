import { buildFeed } from "../utils";


test("buildFeed", () => {
    const items = [
        {
        title: "Test Title",
        id: "1",
        link: "https://example.com",
        description: "Test Description",
        content: "Test Content",
        date: new Date(),
        },
    ];
    const feed = buildFeed(items);
    console.log(feed);
    expect(feed).toEqual({
        items: [
        {
            title: "Test Title",
            id: "1",
            link: "https://example.com",
            description: "Test Description",
            content: "Test Content",
            date: new Date(),
        },
        ],
    });
});