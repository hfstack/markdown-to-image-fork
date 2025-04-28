# SEO元数据组件迁移指南

## 从 `MultilangSEO` 组件迁移到 `generateMetadata` 函数

随着Next.js的元数据API的引入，我们已将多语言SEO解决方案从基于组件的方法迁移到了基于函数的方法。

### 为什么迁移？

1. **更现代的API** - Next.js元数据API是处理元数据的推荐方式。
2. **更好的类型支持** - 新API提供了更强的类型检查。
3. **避免客户端冲突** - 旧的`<Head>`组件可能导致客户端覆盖问题。
4. **统一实现** - 避免代码库中有两种处理元数据的方式。

### 元数据系统统一

我们已将项目中的三种元数据生成方式统一为一种：

1. ~~`<MultilangSEO>` 组件~~ (已弃用)
2. ~~`createPageMetadata` 函数~~ (已弃用)
3. **`generateMetadata` 函数** (推荐使用)

所有页面现在都采用相同的模式生成元数据，便于维护和扩展。

### 如何迁移

#### 之前 (使用 MultilangSEO 组件)

```tsx
import MultilangSEO from '@/components/MultilangSEO';

export default function Page() {
  return (
    <>
      <MultilangSEO 
        customTitle="自定义标题"
        customDescription="自定义描述"
        canonicalPath="about"
      />
      {/* 页面内容 */}
    </>
  );
}
```

#### 现在 (使用 generateMetadata 函数)

**对于动态路由 (推荐方式):**

```tsx
// 注意：由于命名冲突，在动态路由中必须重命名导入的函数
import { generateMetadata as createMetadata } from '@/src/components/generateMetadata';
import { Metadata } from 'next';

// 为动态路由生成元数据
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return createMetadata({ 
    locale: params.locale,
    pageName: 'home', // 使用预设的页面元数据
    // 或者使用自定义值
    // customTitle: '自定义标题',
    // customDescription: '自定义描述', 
  });
}

export default function Page() {
  // 页面内容
  return <YourComponent />;
}
```

**对于静态路由 (不推荐，因为无法获取动态locale参数):**

```tsx
import { generateMetadata } from '@/components/generateMetadata';

// 导出元数据
export const metadata = generateMetadata({ 
  locale: 'zh', // 必须硬编码语言
  customTitle: '自定义标题',
  customDescription: '自定义描述',
  canonicalPath: 'about' 
});

export default function Page() {
  // 不需要在页面中包含元数据组件
  return <YourComponent />;
}
```

### 使用页面特定元数据

我们现在支持为特定页面定义预设的元数据：

```tsx
import { generateMetadata as createMetadata } from '@/src/components/generateMetadata';
import { Metadata } from 'next';

// 使用预定义的页面特定元数据
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return createMetadata({ 
    locale: params.locale,
    pageName: 'md2pdf' // 使用md2pdf的预设元数据
  });
}
```

**目前支持的页面预设:**
- `home` - 首页
- `md2pdf` - Markdown转PDF页面
- `md2richTxt` - Markdown转富文本页面

如果需要为新页面添加特定元数据，请修改`generateMetadata.ts`中的`pageSpecificMetaByLocale`对象。

### 注意：处理命名冲突

在 Next.js 应用中，页面的 metadata 通常通过导出名为 `generateMetadata` 的函数来定义。由于我们的自定义函数也叫 `generateMetadata`，当在同一个文件中导入和导出同名函数时会出现命名冲突。

解决方法是在导入时为函数指定别名：

```tsx
// 在导入时重命名函数，避免命名冲突
import { generateMetadata as createMetadata } from '@/src/components/generateMetadata';

export async function generateMetadata({ params }) {
  return createMetadata({ ... });
}
```

### 参数对照表

| MultilangSEO 组件 | generateMetadata 函数 |
|-------------------|----------------------|
| customTitle       | customTitle          |
| customDescription | customDescription    |
| customKeywords    | customKeywords       |
| ogImage           | ogImage              |
| canonicalPath     | canonicalPath        |
| N/A (自动从路由获取) | locale              |
| N/A               | pageName (新增)      |

### 注意事项

1. `locale` 参数现在是必须的，不再自动从路由获取
2. 对于动态路由，您需要实现 `generateMetadata` 导出函数
3. 网站域名已统一为 `https://www.md2poster.com`
4. 对于常用页面，可以使用 `pageName` 参数使用预设的元数据配置
5. 在页面文件中导入时，记得重命名函数避免命名冲突

如有任何问题，请联系开发团队。 