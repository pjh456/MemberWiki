import React from "react";
import MDEditor from "@uiw/react-md-editor";
import type { ICommand } from "@uiw/react-md-editor";
import type { TextAreaTextApi, TextState } from "@uiw/react-md-editor";
import {
  getCommands,
  getExtraCommands,
} from "@uiw/react-md-editor/commands-cn";
import { cn } from "@/lib/utils";

export interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  preview?: boolean;
  toolbarOptions?: ICommand[];
  className?: string;
  locale?: string;
  theme?: "light" | "dark";
  onImageUpload?: (file: File) => Promise<string>;
  textareaMaxLength?: number;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder = "请输入内容...",
  preview = true,
  toolbarOptions,
  className,
  // locale = "zh-CN", // 备用参数，暂未直接使用
  theme = "light",
  onImageUpload,
  textareaMaxLength,
}) => {
  // 处理自定义图片上传命令（仅演示，需根据具体需求自定义）
  const extraCommands = React.useMemo<ICommand[]>(() => {
    if (!onImageUpload) return [];
    return [
      {
        name: "image-upload",
        keyCommand: "image-upload",
        icon: <span className="material-icons" style={{fontSize:16}}>image</span>,
        buttonProps: { 'aria-label': '上传图片' },
        // state 参数暂未用到
        execute: async (_state: TextState, api: TextAreaTextApi) => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.onchange = async () => {
            const file = input.files?.[0];
            if (file) {
              const url = await onImageUpload(file);
              if (url) {
                api.replaceSelection(`![图片](${url})`);
              }
            }
          };
          input.click();
        }
      }
    ];
  }, [onImageUpload]);

  return (
    <div
      className={cn(
        "w-full flex flex-col md:flex-row gap-4 border rounded-lg bg-background dark:bg-zinc-900 p-2 transition-colors",
        className
      )}
      data-color-mode={theme}
    >
      <div className="w-full md:w-1/2">
        <MDEditor
          value={value}
          onChange={(v?: string) => v !== undefined && onChange(v)}
          preview={preview ? "edit" : "preview"}
          commands={toolbarOptions ?? getCommands()}
          extraCommands={[...extraCommands, ...getExtraCommands()]}
          visiableDragbar={false}
          height={300}
          autoFocus={false}
          className={"min-h-[300px]"}
          textareaProps={{
            placeholder,
            maxLength: typeof textareaMaxLength === 'number' ? textareaMaxLength : undefined,
          }}
        />
      </div>
      {preview && (
        <div className="w-full md:w-1/2 bg-muted dark:bg-zinc-800 rounded-lg p-3 overflow-auto">
          <MDEditor.Markdown
            source={value}
            style={{ background: 'transparent', color: 'inherit' }}
            data-color-mode={theme}
          />
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
