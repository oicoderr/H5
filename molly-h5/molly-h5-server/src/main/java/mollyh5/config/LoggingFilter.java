package mollyh5.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;

@Component
public class LoggingFilter extends OncePerRequestFilter {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        ContentCachingRequestWrapper requestWrapper = new ContentCachingRequestWrapper(request);
        ContentCachingResponseWrapper responseWrapper = new ContentCachingResponseWrapper(response);
        Instant start = Instant.now();
        filterChain.doFilter(requestWrapper, responseWrapper);
        Instant end = Instant.now();

        String requestBody = readRequest(requestWrapper);
        if (requestBody != null && requestBody.endsWith("\n")) {
            requestBody = requestBody.substring(0, requestBody.length() - 1);
        }

        String responseBody = new String(responseWrapper.getContentAsByteArray(), StandardCharsets.UTF_8);

        responseWrapper.copyBodyToResponse();

        logger.info("{} {} {}\n<<<<<<<<<<\nq={}\nt={}ms\nr={}\n>>>>>>>>>>\n",
                request.getMethod(),
                request.getRequestURI(),
                responseWrapper.getStatus(),
                requestBody,
                Duration.between(start, end).toMillis(),
                responseBody);
    }

    private String readRequest(ContentCachingRequestWrapper request) {
        if ("POST".equals(request.getMethod())) {
            return new String(request.getContentAsByteArray(), StandardCharsets.UTF_8);
        } else {
            return request.getMethod();
        }
    }
}
