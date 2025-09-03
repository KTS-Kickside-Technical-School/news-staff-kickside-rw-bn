import slugify from "slugify";

export const generateSlug = (title: string) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const time = Date.now();

    const baseSlug = slugify(title, {
        lower: true,
        strict: true,
    });

    return `${year}-${month}-${baseSlug}-${time}`;
};