const getDate = (isoDateString) => {
    const date = new Date(isoDateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
}

// set fake time
const setDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(`${year}-${month}-${day}T00:00:00Z`);

    return date.toISOString();
}

export {getDate, setDate}