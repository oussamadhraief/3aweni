export const calculateTimeAgo = (dateStr) => {
    const dateCreated = new Date(dateStr);
    const dateNow = new Date();
    const timeDiff = dateNow.getTime() - dateCreated.getTime();

    const millisecondsInMinute = 60000;
    const millisecondsInHour = millisecondsInMinute * 60;
    const millisecondsInDay = millisecondsInHour * 24;
    const millisecondsInWeek = millisecondsInDay * 7;
    const millisecondsInMonth = millisecondsInDay * 30;
    const millisecondsInYear = millisecondsInDay * 365;

    if (timeDiff < millisecondsInHour) {
      const diffInMinutes = Math.floor(timeDiff / millisecondsInMinute);
      return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"}`;
    } else if (timeDiff < millisecondsInDay) {
      const diffInHours = Math.floor(timeDiff / millisecondsInHour);
      return `${diffInHours} heure${diffInHours === 1 ? "" : "s"}`;
    } else if (timeDiff < millisecondsInWeek) {
      const diffInDays = Math.floor(timeDiff / millisecondsInDay);
      return `${diffInDays} jour${diffInDays === 1 ? "" : "s"}`;
    } else if (timeDiff < millisecondsInMonth) {
      const diffInWeeks = Math.floor(timeDiff / millisecondsInWeek);
      return `${diffInWeeks} semaine${diffInWeeks === 1 ? "" : "s"}`;
    } else if (timeDiff < millisecondsInYear) {
      const diffInMonths = Math.floor(timeDiff / millisecondsInMonth);
      return `${diffInMonths} mois${diffInMonths === 1 ? "" : "s"}`;
    } else {
      const diffInYears = Math.floor(timeDiff / millisecondsInYear);
      return `${diffInYears} années${diffInYears === 1 ? "" : "s"}`;
    }
  }