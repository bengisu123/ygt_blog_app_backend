require "faker"

# default user
u = User.find_or_create_by!(email: "bengisu@example.com") do |user|
  user.name = "Bengisu"
  user.password = "123456"
  user.password_confirmation = "123456"
end

# sample posts
3.times do
  u.posts.find_or_create_by!(
    title: ["Bugün Neler Öğrendim?", "Rails ve Next.js", "Günlük Notlarım"].sample,
    content: [
      "Bugün blog uygulamama yazıları eklemeyi öğrendim!",
      "Backend ve frontend artık birbiriyle konuşuyor, harika :)",
      "Projeyi geliştirirken birçok yeni şey keşfettim."
    ].sample
  )
end


puts "Seeded user: #{u.email} / 123456"
