package part1;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.junit.jupiter.api.*;

public class FirstSeleniumTest {
    static WebDriver driver;

    @BeforeEach
    public void setUp() {
        // Set the path to your chromedriver executable
        System.setProperty("webdriver.edge.driver", "C:\\Users\\Thanuja rajawardhana\\Downloads\\edgedriver_win64");

        driver = new ChromeDriver(); // Initialize the driver
        driver.get("http://localhost:3000/login"); // Or your login page URL
    }

    @Test
    public void testLoginApplication() throws InterruptedException {
        Thread.sleep(2000); // Wait for page load (use WebDriverWait in production)

        WebElement username = driver.findElement(By.name("username"));
        username.sendKeys("thanu");

        WebElement password = driver.findElement(By.name("password"));
        password.sendKeys("thanu");

        driver.findElement(By.tagName("button")).click();
    }

    @AfterEach
    public void tearDown() {
        // driver.quit(); // Close the browser after test
    }
}
