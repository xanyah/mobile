import { useNavigation } from "@react-navigation/native"
import { HeaderContainer, HeaderContentContainer, HeaderIconContainer, HeaderTitle, HeaderTitleContainer, MainContainer, MainContentContainer } from "./styled-components"
import { AlignLeft, ArrowLeft, LucideIcon } from "lucide-react-native"
import { SafeAreaView, TouchableOpacity } from "react-native"

type MainLayoutProps = {
  title: string
  canGoBack?: boolean
  children: React.ReactNode
  rightIcon?: LucideIcon
  rightAction?: () => void
}

const MainLayout = ({ title, canGoBack, children, rightIcon: RightIcon, rightAction }: MainLayoutProps) => {
  const navigation = useNavigation()
  return (
    <MainContainer>
      <HeaderContainer>
        <SafeAreaView>
          <HeaderContentContainer>
            <HeaderIconContainer>
              {canGoBack && (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <ArrowLeft color="#fff" />
                </TouchableOpacity>
              )}
            </HeaderIconContainer>
            <HeaderTitleContainer>
              <HeaderTitle>{title}</HeaderTitle>
            </HeaderTitleContainer>
            <HeaderIconContainer>
              {rightAction && RightIcon && (
                <TouchableOpacity onPress={rightAction}>
                  <RightIcon color="#fff" />
                </TouchableOpacity>
              )}
            </HeaderIconContainer>
          </HeaderContentContainer>
        </SafeAreaView>
      </HeaderContainer>
      <MainContentContainer>{children}</MainContentContainer>
    </MainContainer>
  )
}

export default MainLayout
