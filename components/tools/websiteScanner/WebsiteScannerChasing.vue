<template>
  <section>
    <h1
      class="w-full bg-gradient-to-b bg-clip-text text-center text-4xl font-bold text-white md:text-4xl"
    >
      Stop chasing vulnerabilities. <br />
      Eliminate them.
    </h1>
    <div
      class="mt-16 grid grid-cols-1 gap-x-7 gap-y-[80px] md:grid-cols-2 lg:grid-cols-3"
    >
      <div
        class="group/item h-[calc(100%+20px)] min-h-fit w-full rounded-2xl border border-hookYellow/50 bg-[#161625] p-5 md:max-w-[400px]"
      >
        <div class="flex items-center justify-center rounded-md">
          <i class="fa-solid fa-arrows-rotate text-4xl text-hookYellow"></i>
        </div>
        <div class="mt-5">
          <h1
            class="my-4 line-clamp-1 cursor-pointer text-center text-2xl font-bold text-white transition-all duration-300 ease-in-out group-hover/item:text-hookYellow max-md:text-xl md:my-5"
          >
            Full Visibility Across the Attack Surface
          </h1>
          <p
            class="line-clamp-6 text-center text-xl font-medium leading-6 text-paragraph transition-all duration-300 ease-in-out group-hover/item:text-white"
          >
            ZeroPointPath combines the power of multiple industry-standard
            scanners — including Nikto, ZAP, Nuclei, SkipFish, and Wapiti — to
            deliver in-depth analysis of your web applications. Each scan
            generates a detailed and easy-to-read graphical report containing:
            The vulnerability type , Affected URL , Vulnerable parameter , CURL
            command , Attack vector , Technical description
          </p>
        </div>
      </div>
      <div
        class="group/item h-[calc(100%+20px)] min-h-fit w-full rounded-2xl border border-hookYellow/50 bg-[#161625] p-5 md:max-w-[400px]"
      >
        <div class="flex items-center justify-center rounded-md">
          <i
            class="fa-solid fa-triangle-exclamation text-4xl text-hookYellow"
          ></i>
        </div>
        <div class="mt-5">
          <h1
            class="my-4 line-clamp-1 cursor-pointer text-center text-2xl font-bold text-white transition-all duration-300 ease-in-out group-hover/item:text-hookYellow max-md:text-xl md:my-5"
          >
            Risk-Based Prioritization
          </h1>
          <p
            class="line-clamp-6 text-center text-xl font-medium leading-6 text-paragraph transition-all duration-300 ease-in-out group-hover/item:text-white"
          >
            ZeroPointPath focuses on injection-related vulnerabilities like SQL
            Injection, Cross-Site Scripting, OS Command Injection, XML
            Injection, and more. Vulnerabilities are ranked based on
            exploitability and potential impact to help you prioritize what
            truly matters.
          </p>
        </div>
      </div>
      <div
        class="group/item h-[calc(100%+20px)] min-h-fit w-full rounded-2xl border border-hookYellow/50 bg-[#161625] p-5 md:max-w-[400px]"
      >
        <div class="flex items-center justify-center rounded-md">
          <i class="fa-solid fa-users-gear text-4xl text-hookYellow"></i>
        </div>
        <div class="mt-5">
          <h1
            class="my-4 line-clamp-1 cursor-pointer text-center text-2xl font-bold text-white transition-all duration-300 ease-in-out group-hover/item:text-hookYellow max-md:text-xl md:my-5"
          >
            How to Use
          </h1>
          <p
            class="line-clamp-6 text-center text-xl font-medium leading-6 text-paragraph transition-all duration-300 ease-in-out group-hover/item:text-white"
          >
            Clone the repository and launch the scanner with: python3 ZPS.py
            From there, navigate the graphical interface and start scanning.
            should installation process requires a specific set of requirements
            : ZAP , Wapiti , Skipfish, Nikto , Nuclei ,
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
