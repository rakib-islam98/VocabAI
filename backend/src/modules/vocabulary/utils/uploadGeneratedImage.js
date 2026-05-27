import fs from "fs-extra";
import os from "os";
import path from "path";

import cloudinary from "../../../config/cloudinary.js";

/**
 * Fetches AI-generated image from Pollinations
 * and uploads it permanently to Cloudinary.
 */
export const uploadGeneratedImage = async ({ imageUrl, word }) => {
  let tempFilePath;

  try {
    console.log("1. Fetching image from Pollinations...");

    // Timeout protection
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 25000);

    let response;

    try {
      response = await fetch(imageUrl, {
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      throw new Error(`Pollinations responded with status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");

    console.log("2. Content-Type:", contentType);

    if (!contentType?.startsWith("image/")) {
      throw new Error(`Invalid image content-type: ${contentType}`);
    }

    // Convert response into buffer
    const arrayBuffer = await response.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    console.log(
      `3. Image downloaded successfully. Size: ${buffer.length} bytes`,
    );

    // Safe filename
    const safeWord = word
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, "_")
      .replace(/_+/g, "_");

    tempFilePath = path.join(os.tmpdir(), `${safeWord}-${Date.now()}.jpg`);

    // Save temporary local file
    await fs.writeFile(tempFilePath, buffer);

    console.log(`4. Temporary file created: ${tempFilePath}`);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: "vocabai/vocabulary",
    });

    console.log("5. Cloudinary upload successful:", result.secure_url);

    return result.secure_url;
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Pollinations image request timed out");
    }
    console.error("uploadGeneratedImage failed:", error);

    throw error;
  } finally {
    if (tempFilePath) {
      await fs.remove(tempFilePath);
    }
  }
};
