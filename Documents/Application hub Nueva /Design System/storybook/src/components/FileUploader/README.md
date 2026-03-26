A **FileUploader component** that allows uploading files via drag & drop, with size and format validation, simulated progress animation, and visual success/error states.

> **Subpath import:** `FileUploader` is published on a separate subpath to keep `react-dropzone` optional. Install it only when needed:
>
> ```bash
> npm install react-dropzone
> ```
>
> ```tsx
> import { FileUploader } from '@npm_leadtech/cv-ui-kit/fileUploader';
> ```

---

### ✨ Features

- 📂 **Drag & drop:** Full support for dragging and dropping files via `react-dropzone`.
- 🎛 **Validation:** Configurable accepted formats (`pdf`, `doc`, `docx`) and maximum file size in MB.
- 🚦 **Visual states:** `default`, `success`, and `error` with animated progress feedback.
- 📢 **Callbacks:** `onAttachedHandler` returns `{ name, content }` (base64) on success; `onErrorHandler` fires on validation errors (`ERR_FILE_SIZE_LIMIT`, `ERR_UNSUPPORTED_FORMAT`, `ERR_FILE_CORRUPTED`).
- 🧩 **Configurable labels:** All visible text is provided via the `labels` prop for full i18n support.
- 📐 **Full-height mode:** `isFullHeight` makes the uploader stretch to its container.
- ℹ️ **Info section:** Shows accepted formats and max size; can be hidden with `hideInfoText`.
- 🧪 **Test-friendly:** `data-qa` attributes on dropzone, browse button, status messages, and info sections.

---

### ⚙️ Usage Example

```tsx
import { FileUploader } from './FileUploader';

<FileUploader
  formats={['pdf', 'doc', 'docx']}
  size={5}
  labels={{
    acceptableFormat: 'Accepted formats',
    change: 'Change file',
    clickToBrowse: 'Click to browse',
    done: 'Done!',
    dragFileHere: 'Drag your file here',
    fileSize: 'Maximum size',
    invalidFile: 'Invalid file',
    invalidFileDescription: 'The file does not meet the requirements',
    labelSize: 'max',
  }}
  onAttachedHandler={(file) => console.log(file)}
  onErrorHandler={(error) => console.error(error)}
/>;
```

---

### 📋 Props

| Prop                | Type                                                        | Default                  | Description                                                                |
| ------------------- | ----------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------- |
| `formats`           | `FileFormat[]`                                              | `['pdf', 'doc', 'docx']` | Accepted file formats                                                      |
| `hideInfoText`      | `boolean`                                                   | `false`                  | Hides the info section about formats and allowed size                      |
| `isFullHeight`      | `boolean`                                                   | `false`                  | Stretches the uploader to 100% of its container height                     |
| `labels`            | `FileUploaderLabels`                                        | —                        | **Required.** All visible text labels (see below)                          |
| `maxFiles`          | `number`                                                    | `1`                      | Maximum number of files allowed                                            |
| `size`              | `number`                                                    | `1`                      | Maximum file size in MB                                                    |
| `onAttachedHandler` | `(file: { name: string; content: string } \| null) => void` | —                        | **Required.** Fires with base64 content on success, or `null` on rejection |
| `onErrorHandler`    | `(error: { file: File; type: string }) => void`             | —                        | Fires when a validation error occurs                                       |
| `data-qa`           | `string`                                                    | —                        | Base `data-qa` value; suffixes are appended for inner elements             |
| `id`                | `string`                                                    | —                        | HTML `id` attribute                                                        |
| `className`         | `string`                                                    | —                        | Additional CSS classes                                                     |

### 🏷 FileUploaderLabels

| Key                      | Description                          |
| ------------------------ | ------------------------------------ |
| `acceptableFormat`       | Header for the accepted formats list |
| `change`                 | Text for the "change file" action    |
| `clickToBrowse`          | Text for the browse action           |
| `done`                   | Success message                      |
| `dragFileHere`           | Default prompt text                  |
| `fileSize`               | Header for the max size info         |
| `invalidFile`            | Error title                          |
| `invalidFileDescription` | Error description                    |
| `labelSize`              | Size unit label (e.g. "max")         |
