import { ref } from "vue";

export function useScanUrl() {
  const apiKey =
    "4624a307c315af2a919fa52deb4feb059db458f8a64107587186ee6ddb5371ae";
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const scanResults = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const scanUrl = async (url) => {
    loading.value = true;
    error.value = null;
    scanResults.value = null;

    try {
      const scanResponse = await fetch(
        `${proxyUrl}https://www.virustotal.com/api/v3/urls`,
        {
          method: "POST",
          headers: {
            "x-apikey": apiKey,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `url=${encodeURIComponent(url)}`,
        },
      );

      if (!scanResponse.ok)
        throw new Error(`First request error: ${scanResponse.status}`);
      const scanData = await scanResponse.json();
      const urlId = scanData.data.id;

      // 2️⃣ جلب نتائج الفحص باستخدام الـ ID
      const resultResponse = await fetch(
        `${proxyUrl}https://www.virustotal.com/api/v3/analyses/${urlId}`,
        {
          method: "GET",
          headers: { "x-apikey": apiKey },
        },
      );

      if (!resultResponse.ok)
        throw new Error(`Second request error: ${resultResponse.status}`);
      const resultData = await resultResponse.json();

      if (!resultData.data || !resultData.data.attributes) {
        throw new Error("Invalid response format.");
      }

      const attributes = resultData.data.attributes;
      const stats = attributes.stats;

      // تصنيف البيانات حسب النوع
      const vendors = { Phishing: [], Clean: [], Unrated: [] };

      if (attributes.results) {
        for (const [vendor, result] of Object.entries(attributes.results)) {
          const status = result.result
            ? result.result.toLowerCase()
            : "unrated";
          if (status === "clean")
            vendors.Clean.push({ vendor, result: "✅ Clean" });
          else if (status === "unrated")
            vendors.Unrated.push({ vendor, result: "❓ Unrated" });
          else vendors.Phishing.push({ vendor, result: "❌ Phishing" });
        }
      }

      scanResults.value = {
        malicious: stats.malicious,
        harmless: stats.harmless,
        suspicious: stats.suspicious,
        lastAnalysisDate: new Date(attributes.date * 1000).toLocaleString(),
        vendors,
      };
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return { scanUrl, scanResults, loading, error };
}
