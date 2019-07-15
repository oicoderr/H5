package mollyh5.core.icon.service;

import org.junit.Test;

public class IconServiceTest {

    @Test
    public void downloadUserIcon() {
        IconService iconService = new IconService();

        iconService.downloadUserIcon("12345", "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLFPJR06vhs117VoicStyeCcRcdLGdwztvLpaYE7bawnhqSmYNS9HN87VpzamdHw27CWrOKUcqzaaA/132");

        System.out.println(iconService.getUserIcon("12345"));
    }
}