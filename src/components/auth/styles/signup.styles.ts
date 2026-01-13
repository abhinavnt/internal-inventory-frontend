// styles/signup.styles.ts

export const pageContainer = `min-h-screen bg-[#1C2023] text-foreground overflow-hidden`;

// Gradient background still only shows on lg+
export const gradientBackground = `hidden lg:block`;

export const backButton = `absolute flex items-center gap-2 text-white hover:opacity-80 transition-opacity top-6 left-4 md:top-10 md:left-10 lg:top-12 lg:left-12`;

export const backIcon = `text-[#ECFA23] md:w-[18px] md:h-[18px] lg:w-5 lg:h-5`;

export const backText = `text-sm md:text-sm lg:text-base`;

// Main content flex
// Mobile: column, md/lg: column but items center, xl: row with items-start
export const mainContent = `flex flex-col md:flex-col lg:flex-col xl:flex-row min-h-screen pt-16 md:items-center md:justify-center lg:items-center lg:justify-center xl:items-start xl:justify-start`;

// Form section
// Mobile: items-start, md/lg: center, xl: left padding
export const formSection = `flex-1 flex items-start md:items-center md:justify-center lg:items-center lg:justify-center xl:justify-start xl:pl-[84px] px-2 md:px-8 xl:px-0`;

export const formWrapper = `w-full max-w-md md:max-w-md lg:max-w-md xl:max-w-none xl:w-auto md:pt-0 lg:pt-0 xl:pt-0`;

export const heading = `bg-gradient-to-r from-[#0cc2ef] to-[#ecfa23] bg-clip-text text-transparent font-semibold leading-none text-2xl w-[211px] h-[30px] mt-10 ml-4 md:text-4xl md:text-center md:w-auto md:h-auto md:mt-0 md:ml-0 md:mb-3 lg:text-4xl lg:text-center lg:w-auto lg:h-auto lg:mt-0 lg:ml-0 lg:mb-3 xl:text-[42px] xl:text-left xl:w-[370px] xl:h-[53px] xl:mt-0 xl:ml-0 xl:mb-0`;

export const subHeading = `text-white leading-none mt-2 ml-4 text-base w-[261px] h-10 font-normal md:text-[22px] md:font-semibold md:text-center md:w-auto md:h-auto md:mt-0 md:ml-0 md:mb-8 lg:text-[22px] lg:font-semibold lg:text-center lg:w-auto lg:h-auto lg:mt-0 lg:ml-0 lg:mb-8 xl:text-[26px] xl:font-semibold xl:text-left xl:w-[660px] xl:h-[33px] xl:mt-[13px] xl:ml-0 xl:mb-0`;

export const formFields = `mt-6 space-y-4 ml-4 md:mt-0 md:ml-0 md:space-y-6 lg:mt-6 lg:ml-0 lg:space-y-6 xl:mt-12 xl:ml-0 xl:space-y-6`;

export const signupButtonWrapper = `mt-16 flex justify-center md:mt-8 lg:mt-8 lg:justify-center xl:mt-10 xl:justify-start xl:ml-0`;

export const signupButton = `font-semibold bg-gradient-to-r from-[#0cc2ef] to-[#ecfa23] text-[#333333] rounded-[10px] w-[300px] h-[50px] text-lg md:rounded-[12px] md:w-full md:h-[45px] md:text-[17px] lg:rounded-[12px] lg:w-full lg:h-[45px] lg:text-[17px] xl:rounded-[15px] xl:w-[447px] xl:h-[47px] xl:text-lg`;

export const loginWrapper = `mt-8 text-center lg:text-center xl:w-[447px]`;

export const loginText = `text-white text-lg font-medium leading-none md:text-[17px] lg:text-[17px] xl:text-lg`;

export const loginButton = `text-white cursor-pointer hover:opacity-80 transition-opacity underline md:underline lg:underline xl:no-underline text-lg font-bold leading-none md:text-[17px] lg:text-[17px] xl:text-lg`;

// Image wrapper shows only on xl+
export const rightImageWrapper = `hidden xl:block absolute top-12 left-[882px] w-[500px] h-[624px] bg-gradient-to-b from-[#0cc2ef] to-[#ecfa23] rounded-[15px] p-[1px]`;

export const rightImage = `w-full h-full object-cover rounded-[14px]`;
