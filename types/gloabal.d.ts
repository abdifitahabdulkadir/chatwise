interface ChatItemI {
  role: "data" | "system" | "user" | "assistant";
  content: string;
}

interface UserI {
  _id: Schema.Types.ObjectId;
  name?: string;
  email: string;
  password?: string;
  image?: string;
}
interface ChatTitleI {
  _id: Schema.Types.ObjectId;
  chatId: string;
  title: string;
  userId: Schema.Types.ObjectId;
}
interface AccountI {
  _id: Schema.Types.ObjectId;
  provider: "credentials" | "github" | "google";
  providerAccountId: string;
  image?: string;
  name?: string;
  password?: string;
  userId: Schema.Types.ObjectId;
}

interface StoreChatParams {
  question: string;
  answer: string;
  role: "system" | "user";
  chatId?: string;
}

interface PageRouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface PreviousChatPros {
  content: string;
  role: string;
}

interface RenderActiveProps extends PreviousChatPros {
  isLoading: boolean;
}
type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  errors?: {
    message: string;
    details: Record<string, string[]>;
  };
  statusCode?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & {
  success: true;
};

type ErrorResponse = ActionResponse<undefined> & { success: false };

type ApiErroResponse = NextResponse<ErrorResponse>;

type ApiResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface SignInWithOAuthProps {
  user: {
    name: string;
    email: string;
    image?: string;
  };
  provider: "credentials" | "github" | "google";
  providerAccountId: string;
}
