export default objDate => {
    const date = objDate;
    const formatter = new Intl.DateTimeFormat('ru', {
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric'
    });

    return formatter.format(date);
};
