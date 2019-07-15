package mollyh5.api.common;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class TimeHelper {
    public static final ZoneId CST = ZoneId.of("Asia/Shanghai");
    public static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
    public static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm:ss");

    public static Long getTimeStamp() {
        return LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli()/1000;
    }

    public static Date toDate(LocalDateTime ldt) {
        ZonedDateTime zdt = ldt.atZone(CST);

        return Date.from(zdt.toInstant());
    }

    public static LocalDate toLocalDate(Date date) {
        return date.toInstant().atZone(CST).toLocalDate();
    }

    public static LocalDateTime toLocalDateTime(Date date) {
        Instant instant = date.toInstant();
        ZoneId zone = ZoneId.systemDefault();
        return LocalDateTime.ofInstant(instant, zone);
    }

    public static String getDateTimeString(LocalDateTime ldt) {
        return FORMATTER.format(ldt);
    }

    public static int calcAge(LocalDate birthday, LocalDate now) {
        return Period.between(birthday, now).getYears();
    }

    public static int getYearMonth(LocalDate date) {
        return date.getYear() * 100 + date.getMonthValue();
    }

    public static String formatDuration(Duration d) {
        return TIME_FORMATTER.format(LocalTime.ofNanoOfDay(d.toNanos()));
    }
}
