export const fetchImages = async (page: number, limit: number) => {
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      return data ? data : []
    } catch (err) {
      console.error("Error fetching images:", err);
      return [];
    }
  };